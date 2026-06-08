// Pulls the authoritative monthly tourist series for Cyprus from Eurostat and
// rewrites src/data/tourism.json. Run where the network can reach ec.europa.eu
// (the weekly dam refresh deliberately does NOT call this — tourism is annual-ish).
//
//   node scripts/refresh-annual.mjs
//
// tour_occ_arm = arrivals at tourist accommodation (monthly).
// Swap to tour_occ_nim for "nights spent" if you prefer that measure.

import { writeFileSync } from 'node:fs';

const DATASET = 'tour_occ_arm';
const URL =
  `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${DATASET}` +
  `?format=JSON&lang=EN&geo=CY&freq=M&unit=NR&c_resid=TOTAL&nace_r2=I551-I553&sinceTimePeriod=2023`;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

async function main() {
  const res = await fetch(URL, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`Eurostat ${DATASET} -> HTTP ${res.status}`);
  const data = await res.json();

  // With every non-time dimension pinned to a single category, the JSON-stat
  // linear index collapses to the time position.
  const timeIndex = data.dimension.time.category.index; // { "2024M01": 0, ... }
  const values = data.value; // object/array keyed by linear index

  // pick the most recent complete calendar year present in the data
  const periods = Object.keys(timeIndex);
  const years = [...new Set(periods.map((p) => +p.slice(0, 4)))].sort();
  const complete = years.reverse().find((y) =>
    Array.from({ length: 12 }, (_, i) => `${y}M${String(i + 1).padStart(2, '0')}`)
      .every((p) => values[timeIndex[p]] != null)
  );
  if (!complete) throw new Error('No complete calendar year found');

  const months = MONTHS.map((m, i) => {
    const period = `${complete}M${String(i + 1).padStart(2, '0')}`;
    return { m, n: i + 1, arrivals: values[timeIndex[period]], exact: true };
  });
  const annual = months.reduce((a, b) => a + b.arrivals, 0);

  const out = {
    source: `Eurostat ${DATASET} (geo=CY), sourced from CYSTAT.`,
    note: `Monthly ${DATASET === 'tour_occ_arm' ? 'arrivals' : 'nights'} for ${complete}, all months exact.`,
    year: complete,
    annual,
    months,
  };
  writeFileSync('src/data/tourism.json', JSON.stringify(out, null, 2));
  console.log(`Wrote tourism.json — ${complete}, annual ${annual.toLocaleString()}.`);
}

main().catch((e) => { console.error('Tourism refresh failed:', e.message); process.exit(1); });
