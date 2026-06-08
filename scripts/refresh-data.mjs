// Regenerates src/data/snapshot.json from the live fragmata.info API.
// Source: Cyprus Water Development Department, via fragmata.info (Vladimir Bugay).
// Run locally with `npm run refresh`; runs weekly in CI (.github/workflows/refresh.yml).
//
// The output schema is exactly what App.jsx expects — keep them in sync.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = 'https://fragmata.info/api/v1';
const OUT = 'src/data/snapshot.json';

// Dams plotted individually in the seasonal chart (kept in history to stay slim).
const HISTORY_DAMS = ['kouris', 'asprokremmos', 'evretou', 'kannaviou', 'germasoyeia'];

const MONTHS = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
  JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
};

// "16-APR-2026" -> "2026-04-16"
function isoFromReportDate(s) {
  if (!s) return new Date().toISOString().slice(0, 10);
  const [d, mon, y] = s.split('-');
  const mm = MONTHS[(mon || '').toUpperCase()] ?? '01';
  return `${y}-${mm}-${String(d).padStart(2, '0')}`;
}

const round = (v, n = 2) => (v == null ? null : Math.round(v * 10 ** n) / 10 ** n);

async function getJSON(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function main() {
  console.log('Fetching fragmata API…');
  const [summary, reservoirs, inflow, historical] = await Promise.all([
    getJSON(`${BASE}/summary/`),
    getJSON(`${BASE}/reservoirs/`),
    getJSON(`${BASE}/inflow/`),
    getJSON(`${BASE}/historical/?from=1988-01-01`),
  ]);

  const snapshot = {
    snapshotDate: isoFromReportDate(summary.reportDate),
    source:
      'Cyprus Water Development Department, via fragmata.info (open data, Vladimir Bugay)',
    totalCapacity: summary.totalCapacity,
    systemNow: { mcm: summary.totalStorage, pct: summary.totalStoragePercent },
    systemLastYear: {
      mcm: summary.lastYearStorage,
      pct: summary.lastYearStoragePercent,
    },
    history: (historical.entries ?? []).map((e) => {
      const row = { date: e.date };
      for (const k of HISTORY_DAMS) row[k] = round(e[k]);
      row.totalAll = round(e.totalAll);
      return row;
    }),
    inflow: (inflow.years ?? []).map((y) => ({
      year: y.year,
      months: y.months,
      total: y.total,
    })),
    reservoirs: (reservoirs.reservoirs ?? []).map((r) => ({
      name: r.name,
      capacity: r.capacity,
      region: r.region,
      curPct: r.storagePercent,
      curMCM: r.storageMCM,
      lyPct: r.lastYearPercent,
      lyMCM: r.lastYearMCM,
      inflowOct: r.inflowSinceOctober,
    })),
  };

  // sanity checks — fail loudly so CI doesn't commit a broken file
  if (!snapshot.reservoirs.length) throw new Error('No reservoirs returned');
  if (snapshot.history.length < 100) throw new Error('History looks too short');
  if (snapshot.systemNow.pct == null) throw new Error('Missing system total');

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(snapshot));
  console.log(
    `Wrote ${OUT} — ${snapshot.snapshotDate}, ${snapshot.reservoirs.length} dams, ` +
      `${snapshot.history.length} history points, ${snapshot.inflow.length} inflow years, ` +
      `system ${snapshot.systemNow.pct}%.`
  );
}

main().catch((err) => {
  console.error('Refresh failed:', err.message);
  process.exit(1);
});
