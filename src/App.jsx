import React, { useState, useMemo } from "react";
import DATA from "./data/snapshot.json";
import TOURISM from "./data/tourism.json";
/* ============================ curated restriction events ============================ */
const EVENTS = [
  { startY: 1989, endY: 1991, label: "1990–91 drought", scope: "household",
    note: "Severe drought; supply rationing imposed across the major towns." },
  { startY: 1996, endY: 2000, label: "1997–2000 drought", scope: "household",
    note: "Urban supply held below normal — Nicosia ~80%, Limassol ~86%, Larnaca ~70% of continuous flow." },
  { startY: 2007, endY: 2009, label: "2007–08 crisis", scope: "household",
    note: "Weekly cuts; supply ~8h per 48h. Water shipped from Greece by tanker Jul–Nov 2008 (~40–50k m³/day). Reserves bottomed near 13 MCM." },
  { startY: 2017, endY: 2018, label: "2018 drought", scope: "agriculture",
    note: "Lowest dams since 2008. Irrigation cut for farmers; urban taps maintained via desalination." },
  { startY: 2023, endY: 2025, label: "2024–25 drought", scope: "agriculture",
    note: "State of emergency Jan 2025 (~10% reserves). Farmers −30%, public asked −10%, UAE desalination units deployed." },
];

const DAMS = [
  { key: "totalAll", label: "Whole system", unit: "MCM", cap: null },
  { key: "kouris", label: "Kouris", unit: "%", cap: 115 },
  { key: "asprokremmos", label: "Asprokremmos", unit: "%", cap: 52.375 },
  { key: "evretou", label: "Evretou", unit: "%", cap: 24 },
  { key: "kannaviou", label: "Kannaviou", unit: "%", cap: 17.168 },
  { key: "germasoyeia", label: "Germasoyeia", unit: "%", cap: 13.5 },
];

/* ============================ helpers ============================ */
function waterYearInfo(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const startYear = m >= 10 ? y : y - 1;
  const start = Date.UTC(startYear, 9, 1);
  const cur = Date.UTC(y, m - 1, d);
  const doy = Math.round((cur - start) / 86400000);
  const label = `${String(startYear % 100).padStart(2, "0")}/${String((startYear + 1) % 100).padStart(2, "0")}`;
  return { startYear, doy, label };
}
// month tick positions on a water-year axis (Oct 1 = 0), non-leap reference
const MONTH_TICKS = (() => {
  const names = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const lens = [31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];
  const out = []; let acc = 0;
  for (let i = 0; i < 12; i++) { out.push({ name: names[i], doy: acc }); acc += lens[i]; }
  return out;
})();

function levelColor(pct) {
  if (pct < 10) return "var(--c-crit)";
  if (pct < 25) return "var(--c-low)";
  if (pct < 50) return "var(--c-mod)";
  if (pct < 80) return "var(--c-good)";
  return "var(--c-full)";
}
function levelName(pct) {
  if (pct < 10) return "Critical";
  if (pct < 25) return "Low";
  if (pct < 50) return "Moderate";
  if (pct < 80) return "Good";
  return "Full";
}

/* ============================ tiny svg line chart primitives ============================ */
function useScales(w, h, pad, xmax, ymax) {
  const X = (v) => pad.l + (v / xmax) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / ymax) * (h - pad.t - pad.b);
  return { X, Y };
}
function path(points, X, Y) {
  return points
    .filter((p) => p.y != null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`)
    .join(" ");
}

/* ============================ SEASONAL OVERLAY CHART ============================ */
const DROUGHT_YEARS = new Set(["07/08", "17/18", "24/25"]);
const CURRENT_YEAR = "25/26";
const NOTABLE_WET = ["03/04", "11/12", "18/19", "19/20", "21/22"];

function OverlayChart({ damKey, pinned, togglePin }) {
  const dam = DAMS.find((d) => d.key === damKey);
  const isPct = dam.unit === "%";
  const [hover, setHover] = useState(null);
  const w = 760, h = 420, pad = { l: 52, r: 18, t: 18, b: 34 };

  const series = useMemo(() => {
    const groups = {};
    for (const row of DATA.history) {
      const raw = row[damKey];
      if (raw == null) continue;
      const v = isPct ? (raw / dam.cap) * 100 : raw;
      const { label, doy } = waterYearInfo(row.date);
      (groups[label] ||= []).push({ x: doy, y: v, date: row.date });
    }
    return Object.entries(groups)
      .map(([label, pts]) => ({ label, pts: pts.sort((a, b) => a.x - b.x) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [damKey]);

  const ymax = isPct ? 105 : 300;
  const { X, Y } = useScales(w, h, pad, 365, ymax);

  // category of a year: pinned > current > drought > base
  const cat = (label) =>
    pinned.has(label) ? "pin" : label === CURRENT_YEAR ? "cur" : DROUGHT_YEARS.has(label) ? "dry" : "base";
  const styleFor = {
    base: { c: "var(--faint)", wBase: 1, wActive: 2.4, op: 0.5 },
    dry: { c: "var(--c-low)", wBase: 2.2, wActive: 3.4, op: 0.95 },
    cur: { c: "var(--c-water)", wBase: 3.6, wActive: 3.8, op: 1 },
    pin: { c: "var(--c-pin)", wBase: 3, wActive: 3.6, op: 1 },
  };
  // draw order
  const rank = { base: 0, dry: 1, cur: 2, pin: 3 };
  const ordered = [...series].sort((a, b) => rank[cat(a.label)] - rank[cat(b.label)]);

  const labelPeak = (s) => s.pts.reduce((a, b) => (b.y > a.y ? b : a), s.pts[0]);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {/* 100% reference (pct view) */}
        {isPct && (
          <g>
            <line x1={pad.l} x2={w - pad.r} y1={Y(100)} y2={Y(100)} stroke="var(--c-full)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <text x={w - pad.r} y={Y(100) - 5} textAnchor="end" className="axlbl" style={{ fill: "var(--c-full)" }}>full / overflow</text>
          </g>
        )}
        {/* y gridlines */}
        {(isPct ? [0, 25, 50, 75, 100] : [0, 75, 150, 225, 300]).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}{isPct ? "%" : ""}</text>
          </g>
        ))}
        {/* month ticks */}
        {MONTH_TICKS.map((m) => (
          <text key={m.name} x={X(m.doy + 15)} y={h - 12} textAnchor="middle" className="axlbl">{m.name}</text>
        ))}
        {/* lines */}
        {ordered.map((s) => {
          const c = cat(s.label); const st = styleFor[c];
          const active = hover === s.label;
          const dim = hover && hover !== s.label && c === "base";
          return (
            <path key={s.label} d={path(s.pts, X, Y)} fill="none"
              stroke={st.c} strokeWidth={active ? st.wActive : st.wBase}
              opacity={dim ? 0.18 : st.op}
              onMouseEnter={() => setHover(s.label)}
              onClick={() => togglePin(s.label)}
              style={{ cursor: "pointer" }} />
          );
        })}
        {/* peak labels for pinned + current */}
        {ordered.filter((s) => pinned.has(s.label) || s.label === CURRENT_YEAR).map((s) => {
          const p = labelPeak(s);
          const isPin = pinned.has(s.label);
          return (
            <g key={"lbl" + s.label}>
              <circle cx={X(p.x)} cy={Y(p.y)} r="3.5" fill={isPin ? "var(--c-pin)" : "var(--c-water)"} />
              <text x={X(p.x)} y={Y(p.y) - 8} textAnchor="middle" className="hovlbl"
                style={{ fill: isPin ? "var(--c-pin)" : "var(--c-water-deep)" }}>
                {s.label} · {p.y.toFixed(0)}{isPct ? "%" : ""}
              </text>
            </g>
          );
        })}
        {/* hover label (transient) */}
        {hover && !pinned.has(hover) && hover !== CURRENT_YEAR && (() => {
          const s = series.find((x) => x.label === hover);
          const p = labelPeak(s);
          return (
            <g>
              <circle cx={X(p.x)} cy={Y(p.y)} r="3.5" fill="var(--ink)" />
              <text x={X(p.x)} y={Y(p.y) - 8} textAnchor="middle" className="hovlbl">
                {hover} · peak {p.y.toFixed(0)}{isPct ? "%" : " MCM"}
              </text>
            </g>
          );
        })()}
      </svg>
      <p className="hint">Click any line to pin it · hover to preview</p>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water)" }} />2025/26</span>
        <span><i style={{ background: "var(--c-low)" }} />Drought years</span>
        <span><i style={{ background: "var(--c-pin)" }} />Pinned</span>
        <span><i style={{ background: "var(--faint)" }} />Other years (1988→)</span>
      </div>
      {!isPct && (
        <p className="caveat">System total in absolute MCM. Capacity grew as dams were built (Kannaviou 2006, etc.), so early years sit structurally lower — switch to a single dam for a like-for-like % comparison. The system peaked at 288 MCM (99%) in May 2020.</p>
      )}
    </div>
  );
}

/* ============================ FULL TIMELINE CHART ============================ */
function TimelineChart({ damKey }) {
  const dam = DAMS.find((d) => d.key === damKey);
  const isPct = dam.unit === "%";
  const [hover, setHover] = useState(null);
  const w = 760, h = 380, pad = { l: 52, r: 18, t: 18, b: 28 };

  const pts = useMemo(() => {
    const arr = [];
    for (const row of DATA.history) {
      const raw = row[damKey];
      if (raw == null) continue;
      const [y, m, d] = row.date.split("-").map(Number);
      const t = y + (m - 1) / 12 + d / 365;
      arr.push({ x: t, y: isPct ? (raw / dam.cap) * 100 : raw, date: row.date });
    }
    return arr;
  }, [damKey]);

  const xmin = 1988, xmax = 2026.5;
  const ymax = isPct ? 100 : 300;
  const X = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / ymax) * (h - pad.t - pad.b);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * w;
          const xv = xmin + ((px - pad.l) / (w - pad.l - pad.r)) * (xmax - xmin);
          let best = null, bd = 1e9;
          for (const p of pts) { const dd = Math.abs(p.x - xv); if (dd < bd) { bd = dd; best = p; } }
          if (best && bd < 0.6) setHover(best); else setHover(null);
        }}
        onMouseLeave={() => setHover(null)}>
        {/* restriction bands */}
        {EVENTS.map((ev) => {
          const x1 = X(Math.max(ev.startY, xmin)), x2 = X(ev.endY + 0.75);
          return (
            <g key={ev.label}>
              <rect x={x1} y={pad.t} width={Math.max(2, x2 - x1)} height={h - pad.t - pad.b}
                fill={ev.scope === "household" ? "var(--band-hh)" : "var(--band-ag)"} />
              <text x={(x1 + x2) / 2} y={pad.t + 12} textAnchor="middle" className="bandlbl">{ev.label}</text>
            </g>
          );
        })}
        {/* y grid */}
        {(isPct ? [0, 25, 50, 75, 100] : [0, 75, 150, 225, 300]).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}{isPct ? "%" : ""}</text>
          </g>
        ))}
        {/* x ticks */}
        {[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025].map((yr) => (
          <text key={yr} x={X(yr)} y={h - 10} textAnchor="middle" className="axlbl">{yr}</text>
        ))}
        {/* line */}
        <path d={path(pts, X, Y)} fill="none" stroke="var(--c-water-deep)" strokeWidth="1.8" />
        {/* hover */}
        {hover && (
          <g>
            <line x1={X(hover.x)} x2={X(hover.x)} y1={pad.t} y2={h - pad.b} stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx={X(hover.x)} cy={Y(hover.y)} r="4" fill="var(--c-water-deep)" />
            <text x={X(hover.x) > w / 2 ? X(hover.x) - 8 : X(hover.x) + 8} y={Y(hover.y) - 8}
              textAnchor={X(hover.x) > w / 2 ? "end" : "start"} className="hovlbl">
              {hover.date} · {hover.y.toFixed(isPct ? 0 : 0)}{isPct ? "%" : " MCM"}
            </text>
          </g>
        )}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--band-hh)" }} />Household cuts</span>
        <span><i style={{ background: "var(--band-ag)" }} />Agricultural restrictions</span>
        <span><i style={{ background: "var(--c-water-deep)" }} />Storage</span>
      </div>
    </div>
  );
}

/* ============================ INFLOW CHART ============================ */
function InflowChart() {
  const order = ["October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "Aug-Sep"];
  const w = 760, h = 360, pad = { l: 48, r: 18, t: 16, b: 30 };
  const highlight = { "25/26": "var(--c-water)", "24/25": "var(--c-low)", "18/19": "var(--c-good)" };

  const series = DATA.inflow.map((yr) => {
    let acc = 0; const pts = [];
    order.forEach((m, i) => { acc += yr.months[m] || 0; pts.push({ x: i, y: acc }); });
    return { year: yr.year, pts, total: yr.total };
  });
  const ymax = Math.max(...series.map((s) => s.total)) * 1.05;
  const { X, Y } = useScales(w, h, pad, order.length - 1, ymax);
  const [hover, setHover] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {[0, 50, 100, 150, 200, 250].filter((g) => g <= ymax).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}</text>
          </g>
        ))}
        {order.map((m, i) => (
          <text key={m} x={X(i)} y={h - 10} textAnchor="middle" className="axlbl">{m.slice(0, 3)}</text>
        ))}
        {series.filter((s) => !highlight[s.year]).map((s) => (
          <path key={s.year} d={path(s.pts, X, Y)} fill="none" stroke="var(--faint)"
            strokeWidth={hover === s.year ? 2.4 : 1} opacity={hover && hover !== s.year ? 0.25 : 0.5}
            onMouseEnter={() => setHover(s.year)} style={{ cursor: "pointer" }} />
        ))}
        {series.filter((s) => highlight[s.year]).map((s) => (
          <path key={s.year} d={path(s.pts, X, Y)} fill="none" stroke={highlight[s.year]}
            strokeWidth="3" opacity={hover && hover !== s.year ? 0.4 : 1}
            onMouseEnter={() => setHover(s.year)} style={{ cursor: "pointer" }} />
        ))}
        {hover && (() => {
          const s = series.find((x) => x.year === hover); const last = s.pts[s.pts.length - 1];
          return (<text x={X(last.x) - 6} y={Y(last.y) - 6} textAnchor="end" className="hovlbl">{hover} · {s.total.toFixed(0)} MCM</text>);
        })()}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water)" }} />25/26 · 112 MCM (best since 1987)</span>
        <span><i style={{ background: "var(--c-low)" }} />24/25 · 19 MCM (drought)</span>
        <span><i style={{ background: "var(--c-good)" }} />18/19 · 265 MCM (record wet)</span>
      </div>
    </div>
  );
}

/* ============================ TOURISM x STORAGE OVERLAY ============================ */
function TourismOverlay() {
  const [hover, setHover] = useState(null);
  const w = 760, h = 400, pad = { l: 46, r: 54, t: 20, b: 36 };
  const order = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // water year Oct→Sep

  // storage climatology: mean system %-full by calendar month across all years
  const byMonth = {};
  for (const row of DATA.history) {
    if (row.totalAll == null) continue;
    const m = +row.date.slice(5, 7);
    (byMonth[m] ||= []).push((row.totalAll / DATA.totalCapacity) * 100);
  }
  const stor = order.map((m) => {
    const a = byMonth[m] || [];
    return a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
  });

  const tmap = {};
  TOURISM.months.forEach((o) => (tmap[o.n] = o));
  const tour = order.map((m) => tmap[m]);
  const maxArr = Math.max(...TOURISM.months.map((o) => o.arrivals));

  const X = (i) => pad.l + (i / (order.length - 1)) * (w - pad.l - pad.r);
  const Ys = (v) => h - pad.b - (v / 100) * (h - pad.t - pad.b);
  const Yt = (v) => h - pad.b - (v / (maxArr * 1.12)) * (h - pad.t - pad.b);
  const barW = ((w - pad.l - pad.r) / order.length) * 0.62;

  const peakIdx = order.indexOf(TOURISM.months.reduce((a, b) => (b.arrivals > a.arrivals ? b : a)).n);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        <defs>
          <pattern id="hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="var(--c-mod)" opacity="0.28" />
            <line x1="0" y1="0" x2="0" y2="5" stroke="var(--c-mod)" strokeWidth="2" opacity="0.6" />
          </pattern>
        </defs>
        <rect x={X(peakIdx) - barW} y={pad.t} width={barW * 2} height={h - pad.t - pad.b} fill="var(--c-low)" opacity="0.06" />
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Ys(g)} y2={Ys(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 7} y={Ys(g) + 3} textAnchor="end" className="axlbl">{g}%</text>
          </g>
        ))}
        {[0, 200000, 400000, 600000].map((g) => (
          <text key={g} x={w - pad.r + 7} y={Yt(g) + 3} textAnchor="start" className="axlbl" style={{ fill: "var(--c-mod)" }}>
            {g / 1000}k
          </text>
        ))}
        {tour.map((o, i) => o && (
          <rect key={o.m} x={X(i) - barW / 2} y={Yt(o.arrivals)} width={barW} height={Ys(0) - Yt(o.arrivals)}
            fill={o.exact ? "var(--c-mod)" : "url(#hatch)"} stroke="var(--c-mod)" strokeWidth={o.exact ? 0 : 0.8}
            opacity={hover == null || hover === i ? 0.92 : 0.4}
            onMouseEnter={() => setHover(i)} style={{ cursor: "pointer" }} />
        ))}
        <path d={stor.map((v, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)},${Ys(v).toFixed(1)}`).join(" ")}
          fill="none" stroke="var(--c-water-deep)" strokeWidth="3" />
        {stor.map((v, i) => <circle key={i} cx={X(i)} cy={Ys(v)} r="2.5" fill="var(--c-water-deep)" />)}
        {tour.map((o, i) => (
          <text key={o.m} x={X(i)} y={h - 12} textAnchor="middle" className="axlbl"
            style={{ fontWeight: i === peakIdx ? 700 : 400 }}>{o.m}</text>
        ))}
        {hover != null && tour[hover] && (
          <g>
            <text x={X(hover)} y={Yt(tour[hover].arrivals) - 8} textAnchor="middle" className="hovlbl" style={{ fill: "#8a6418" }}>
              {(tour[hover].arrivals / 1000).toFixed(0)}k{tour[hover].exact ? "" : "*"}
            </text>
            <text x={X(hover)} y={Ys(stor[hover]) - 8} textAnchor="middle" className="hovlbl" style={{ fill: "var(--c-water-deep)" }}>
              {stor[hover].toFixed(0)}%
            </text>
          </g>
        )}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water-deep)" }} />Reservoir fill — 38-yr monthly average (left)</span>
        <span><i style={{ background: "var(--c-mod)" }} />Tourist arrivals 2024 (right)</span>
        <span><i style={{ background: "var(--c-low)", opacity: 0.5 }} />Peak month</span>
      </div>
      <p className="caveat">
        The collision is the point: arrivals crest in <strong>Jul–Aug</strong> just as reservoirs slide toward their late-summer low.
        Sep–Dec arrivals are exact CYSTAT figures; months marked <em>*</em> (hatched) are estimates constrained to the official
        2024 annual total and Jan–Sep cumulative — run <code>npm run refresh:annual</code> to swap in the authoritative Eurostat series.
      </p>
    </div>
  );
}

/* ============================ DAM TABLE ============================ */
function DamTable() {
  const [sort, setSort] = useState({ k: "capacity", dir: -1 });
  const capTotal = DATA.reservoirs.reduce((a, r) => a + r.capacity, 0);
  const rows = [...DATA.reservoirs].sort((a, b) => {
    const av = a[sort.k], bv = b[sort.k];
    if (typeof av === "string") return av.localeCompare(bv) * sort.dir;
    return (av - bv) * sort.dir;
  });
  const head = (k, lbl, align) => (
    <th onClick={() => setSort((s) => ({ k, dir: s.k === k ? -s.dir : (typeof DATA.reservoirs[0][k] === "string" ? 1 : -1) }))}
      style={{ textAlign: align || "left", cursor: "pointer" }}>
      {lbl}{sort.k === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}
    </th>
  );
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            {head("name", "Reservoir")}
            {head("capacity", "Capacity (MCM)", "right")}
            <th style={{ textAlign: "right" }}>% of national</th>
            {head("curPct", "Now", "right")}
            <th style={{ width: "20%" }}>Level</th>
            {head("curMCM", "MCM", "right")}
            <th style={{ textAlign: "right" }}>vs last yr</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const diff = (r.curPct - r.lyPct);
            const share = (r.capacity / capTotal) * 100;
            return (
              <tr key={r.name}>
                <td className="nm">{r.name}</td>
                <td className="num">{r.capacity.toFixed(1)}</td>
                <td className="num" style={{ fontWeight: 600 }}>{share.toFixed(1)}%</td>
                <td className="num" style={{ color: levelColor(r.curPct), fontWeight: 600 }}>{r.curPct.toFixed(1)}%</td>
                <td>
                  <div className="bar"><div className="fill" style={{ width: `${Math.min(100, r.curPct)}%`, background: levelColor(r.curPct) }} /></div>
                </td>
                <td className="num">{r.curMCM.toFixed(2)}</td>
                <td className="num" style={{ color: diff >= 0 ? "var(--c-water)" : "var(--c-low)" }}>
                  {diff >= 0 ? "+" : ""}{diff.toFixed(1)}pp
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ============================ APP ============================ */
/* ============================ YEARLY TREND (CLIMATE) ============================ */
function YearlyTrend() {
  const [hover, setHover] = useState(null);
  const w = 760, h = 360, pad = { l: 40, r: 16, t: 18, b: 30 };
  const KCAP = 115; // Kouris capacity — fixed, full 1988 record → clean climate yardstick

  const by = {};
  for (const r of DATA.history) {
    if (r.kouris == null) continue;
    const [y, m] = r.date.split("-").map(Number);
    const wy = m >= 10 ? y : y - 1;
    (by[wy] ||= []).push((r.kouris / KCAP) * 100);
  }
  const years = Object.keys(by).map(Number).sort((a, b) => a - b);
  const series = years.map((y) => ({ y, v: by[y].reduce((a, b) => a + b, 0) / by[y].length }));
  const ma = series.map((s, i) => {
    const win = series.slice(Math.max(0, i - 2), i + 3);
    return { y: s.y, v: win.reduce((a, b) => a + b.v, 0) / win.length };
  });

  const xmin = years[0], xmax = years[years.length - 1];
  const X = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / 100) * (h - pad.t - pad.b);
  const barW = ((w - pad.l - pad.r) / series.length) * 0.7;

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 7} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}%</text>
          </g>
        ))}
        {series.map((s) => (
          <rect key={s.y} x={X(s.y) - barW / 2} y={Y(s.v)} width={barW} height={Y(0) - Y(s.v)}
            fill={levelColor(s.v)} opacity={hover == null || hover === s.y ? 0.9 : 0.35}
            onMouseEnter={() => setHover(s.y)} style={{ cursor: "pointer" }} />
        ))}
        <path d={ma.map((p, i) => `${i === 0 ? "M" : "L"}${X(p.y).toFixed(1)},${Y(p.v).toFixed(1)}`).join(" ")}
          fill="none" stroke="var(--ink)" strokeWidth="2" opacity="0.8" />
        {[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025].map((yr) => (
          <text key={yr} x={X(yr)} y={h - 10} textAnchor="middle" className="axlbl">{yr}</text>
        ))}
        {hover != null && (() => {
          const s = series.find((x) => x.y === hover);
          return (
            <text x={X(hover)} y={Y(s.v) - 7} textAnchor="middle" className="hovlbl">
              {hover}/{String((hover + 1) % 100).padStart(2, "0")} · {s.v.toFixed(0)}%
            </text>
          );
        })()}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-low)" }} />Kouris annual mean (colour = level)</span>
        <span><i style={{ background: "var(--ink)" }} />5-year moving average</span>
      </div>
      <p className="caveat">
        Decadal means: 1980s 42% · 1990s 24% · 2000s 39% · 2010s 48% · 2020s 48%. The long-run linear trend is
        essentially flat (+0.5pp/yr), so the climate signal here is amplitude, not a steady fall — droughts that bite
        deeper and recoveries that swing higher. Kouris is shown because its capacity is fixed; the system total is
        muddied by dams added over time.
      </p>
    </div>
  );
}

/* ============================ COST LADDER (price per m³ by source) ============================ */
function CostLadder() {
  const rows = [
    { label: "Subsidised irrigation tariff", val: 0.25, rng: "€0.15–0.34", c: "var(--c-good)" },
    { label: "Household drinking-water tariff", val: 0.75, rng: "€0.50–1.00", c: "var(--c-good)" },
    { label: "Desalination — coastal plant", val: 1.25, rng: "€1.00–1.50", c: "var(--c-mod)" },
    { label: "Desalination — mobile unit", val: 2.0, rng: "≈ €2.00", c: "var(--c-low)" },
    { label: "Desalination — floating unit", val: 6.0, rng: "up to €6.00", c: "var(--c-crit)" },
  ];
  const w = 760, barH = 30, gap = 16, padT = 10, x0 = 232, max = 6.5;
  const h = padT * 2 + rows.length * barH + (rows.length - 1) * gap;
  const X = (v) => x0 + (v / max) * (w - x0 - 64);
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {rows.map((r, i) => {
          const y = padT + i * (barH + gap);
          return (
            <g key={r.label}>
              <text x={x0 - 10} y={y + barH / 2 + 4} textAnchor="end" className="ladderlbl">{r.label}</text>
              <rect x={x0} y={y} width={Math.max(2, X(r.val) - x0)} height={barH} rx="2" fill={r.c} opacity="0.9" />
              <text x={X(r.val) + 7} y={y + barH / 2 + 4} className="hovlbl" style={{ fill: "var(--ink)" }}>{r.rng}</text>
            </g>
          );
        })}
      </svg>
      <p className="caveat">
        Cost per cubic metre climbs roughly 25× from stored rainwater to emergency floating desalination. Desal figures
        are production cost; the tariffs are what users are charged — heavily subsidised, so the state absorbs the gap.
      </p>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("overlay"); // overlay | timeline
  const [damKey, setDamKey] = useState("kouris");
  const [pinned, setPinned] = useState(new Set());
  const togglePin = (yr) => setPinned((p) => {
    const n = new Set(p); n.has(yr) ? n.delete(yr) : n.add(yr); return n;
  });
  const clearPins = () => setPinned(new Set());
  const s = DATA;
  const total = s.systemNow.mcm;
  const pct = s.systemNow.pct;
  const lyPct = s.systemLastYear.pct;

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .root{
          --bg:#f3ead9; --paper:#fbf6ec; --ink:#241d17; --muted:#6f6253;
          --grid:#e3d6bf; --faint:#bcae97;
          --c-crit:#7a2410; --c-low:#c0492b; --c-mod:#c9912f; --c-good:#3f93a0; --c-full:#0f4a52;
          --c-water:#1f7d88; --c-water-deep:#0f4a52; --c-pin:#b5326b;
          --band-hh:rgba(192,73,43,0.16); --band-ag:rgba(201,145,47,0.16);
          background:var(--bg); color:var(--ink);
          font-family:'Newsreader',Georgia,serif; line-height:1.6;
          padding:0; min-height:100%;
          background-image:radial-gradient(circle at 12% -5%, rgba(63,147,160,.10), transparent 40%),
                           radial-gradient(circle at 95% 8%, rgba(192,73,43,.08), transparent 38%);
        }
        .wrap{max-width:880px;margin:0 auto;padding:46px 28px 80px;}
        .kicker{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--c-low);margin:0 0 14px;}
        h1{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(38px,7vw,64px);line-height:1.02;letter-spacing:-.02em;margin:0 0 18px;}
        h1 em{font-style:italic;color:var(--c-water-deep);}
        .lede{font-size:19px;color:var(--muted);max-width:640px;margin:0 0 34px;}
        .stats{display:flex;flex-wrap:wrap;gap:26px;padding:22px 0;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink);margin-bottom:46px;}
        .stat .v{font-family:'Fraunces',serif;font-weight:800;font-size:40px;line-height:1;}
        .stat .l{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:6px;}
        h2{font-family:'Fraunces',serif;font-weight:700;font-size:27px;letter-spacing:-.01em;margin:54px 0 6px;}
        .sub{color:var(--muted);font-size:15.5px;margin:0 0 20px;max-width:660px;}
        p.body{font-size:17px;max-width:660px;}
        .card{background:var(--paper);border:1px solid var(--grid);border-radius:4px;padding:22px 20px 16px;box-shadow:0 1px 0 rgba(0,0,0,.04);}
        .toggles{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
        .seg{display:inline-flex;border:1.4px solid var(--ink);border-radius:2px;overflow:hidden;}
        .seg button{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;
          border:none;background:transparent;color:var(--ink);padding:7px 13px;cursor:pointer;}
        .seg button.on{background:var(--ink);color:var(--paper);}
        .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
        .chip{display:flex;flex-direction:column;gap:5px;min-width:96px;border:1px solid var(--faint);background:transparent;color:var(--muted);
          padding:8px 11px;border-radius:5px;cursor:pointer;text-align:left;}
        .chip.on{border-color:var(--c-water-deep);background:var(--c-water-deep);color:var(--paper);}
        .chip .chiptop{font-family:'Newsreader',serif;font-size:14px;font-weight:600;color:inherit;}
        .chip .chipcap{display:flex;align-items:center;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.02em;}
        .chip .chipcap i{display:block;height:4px;border-radius:2px;background:var(--faint);min-width:3px;}
        .chip.on .chipcap i{background:var(--paper);}
        .pinrow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:14px;}
        .pinlbl{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);}
        .pinchip{font-family:'IBM Plex Mono',monospace;font-size:11px;border:1px solid var(--faint);background:transparent;color:var(--muted);
          padding:4px 9px;border-radius:13px;cursor:pointer;}
        .pinchip.on{border-color:var(--c-pin);background:var(--c-pin);color:var(--paper);}
        .pinclear{font-family:'IBM Plex Mono',monospace;font-size:10.5px;border:none;background:transparent;color:var(--c-pin);cursor:pointer;text-decoration:underline;}
        .hint{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:var(--muted);margin:8px 0 0;text-align:right;}
        .caprow{display:flex;align-items:center;gap:8px;}
        .capbar{flex:0 0 56px;height:7px;background:var(--grid);border-radius:4px;overflow:hidden;}
        .capfill{height:100%;background:var(--c-water-deep);border-radius:4px;}
        .capnum{font-family:'IBM Plex Mono',monospace;font-size:12px;white-space:nowrap;}
        .capnum em{font-style:normal;color:var(--muted);font-size:10.5px;margin-left:2px;}
        .axlbl{font-family:'IBM Plex Mono',monospace;font-size:10px;fill:var(--muted);}
        .bandlbl{font-family:'IBM Plex Mono',monospace;font-size:9px;fill:var(--muted);letter-spacing:.04em;}
        .hovlbl{font-family:'IBM Plex Mono',monospace;font-size:12px;fill:var(--ink);font-weight:600;}
        .legendrow{display:flex;gap:18px;flex-wrap:wrap;margin-top:12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);}
        .legendrow i{display:inline-block;width:14px;height:3px;border-radius:2px;margin-right:6px;vertical-align:middle;}
        .caveat{font-size:13px;color:var(--muted);font-style:italic;margin:12px 0 0;}
        .caveat code{font-style:normal;font-family:'IBM Plex Mono',monospace;font-size:11.5px;background:var(--grid);padding:1px 5px;border-radius:3px;}
        .draw{stroke-dasharray:2400;stroke-dashoffset:2400;animation:dr 1.6s .2s ease forwards;}
        @keyframes dr{to{stroke-dashoffset:0;}}
        .tablewrap{overflow-x:auto;border:1px solid var(--grid);border-radius:4px;background:var(--paper);}
        table{width:100%;border-collapse:collapse;font-size:14px;}
        th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
          padding:12px 12px;border-bottom:1.5px solid var(--ink);white-space:nowrap;}
        td{padding:9px 12px;border-bottom:1px solid var(--grid);}
        td.nm{font-weight:600;}
        td.reg{color:var(--muted);font-size:13px;}
        td.num{font-family:'IBM Plex Mono',monospace;text-align:right;font-size:13px;}
        .bar{height:9px;background:var(--grid);border-radius:5px;overflow:hidden;}
        .bar .fill{height:100%;border-radius:5px;}
        .timeline{display:flex;flex-direction:column;gap:0;margin-top:8px;}
        .ev{display:grid;grid-template-columns:108px 1fr;gap:16px;padding:16px 0;border-top:1px solid var(--grid);}
        .ev .yr{font-family:'Fraunces',serif;font-weight:700;font-size:18px;}
        .ev .sc{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
          display:inline-block;padding:3px 7px;border-radius:10px;margin-top:6px;}
        .ev .sc.household{background:var(--band-hh);color:var(--c-crit);}
        .ev .sc.agriculture{background:var(--band-ag);color:#8a6418;}
        .ev .nt{font-size:15px;color:var(--ink);}
        .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;}
        .ladderlbl{font-family:'IBM Plex Mono',monospace;font-size:11px;fill:var(--ink);}
        .costcard{margin-top:18px;background:var(--c-water-deep);color:var(--paper);border-radius:6px;padding:24px 24px;}
        .costbig{font-family:'Fraunces',serif;font-weight:900;font-size:46px;line-height:1;}
        .costbig span{font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:400;opacity:0.7;margin-left:8px;}
        .costlabel{font-size:17px;margin-top:8px;max-width:560px;opacity:0.95;}
        .costwork{font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.2);opacity:0.85;}
        .costcaveat{font-size:12px;font-style:italic;margin-top:10px;opacity:0.7;}        .tile{background:var(--paper);border:1px solid var(--grid);border-left:3px solid var(--c-mod);border-radius:4px;padding:14px 14px;}
        .tile .tv{font-family:'Fraunces',serif;font-weight:800;font-size:26px;line-height:1;color:var(--c-low);}
        .tile .tl{font-size:13px;color:var(--muted);margin-top:8px;line-height:1.45;}
        .foot{margin-top:60px;padding-top:22px;border-top:1.5px solid var(--ink);font-size:13px;color:var(--muted);}
        .foot a{color:var(--c-water-deep);}
        .reveal{opacity:0;transform:translateY(14px);animation:rv .7s ease forwards;}
        @keyframes rv{to{opacity:1;transform:none;}}
      `}</style>

      <div className="wrap">
        <p className="kicker reveal">Cyprus · Water Development Department · snapshot {s.snapshotDate}</p>
        <h1 className="reveal" style={{ animationDelay: ".05s" }}>The price of low rainfall and <em>empty dams</em>.</h1>
        <p className="lede reveal" style={{ animationDelay: ".12s" }}>
          Cyprus relies heavily on its dams to provide water across the island, yet during dry periods it turns to the
          sea, where water costs up to 25 times more than rainfall use. 2026 spring's rebound is a stroke of luck inside
          a very dry decade. This analysis explores how the island fills its reservoirs and drains them each summer, how
          violently the swings have grown, and what it now costs to keep the taps running when the rain doesn't come.
        </p>

        <p className="kicker reveal" style={{ animationDelay: ".16s", marginBottom: 10 }}>Current state · June 2026</p>
        <div id="shot-stats" className="stats reveal" style={{ animationDelay: ".18s" }}>
          <div className="stat"><div className="v">{pct.toFixed(0)}%</div><div className="l">System full · {total.toFixed(0)} MCM</div></div>
          <div className="stat"><div className="v" style={{ color: "var(--c-water)" }}>+{(pct - lyPct).toFixed(0)}pp</div><div className="l">vs a year ago ({lyPct.toFixed(0)}%)</div></div>
          <div className="stat"><div className="v">112</div><div className="l">MCM inflow 25/26 · best since 1987</div></div>
          <div className="stat"><div className="v">{s.totalCapacity.toFixed(0)}</div><div className="l">MCM total capacity · 21 major dams (of ~108)</div></div>
        </div>

        <h2>How the dams fill across a year</h2>
        <p className="sub">
          Every line is one water year (Oct → Sep). The shape tells the story: storage climbs with winter rain,
          peaks around April–May, then bleeds away over summer. Hover any line. Switch to the full timeline to see
          four decades at once, with restriction periods shaded.
        </p>
        <div id="shot-overlay" className="card">
          <div className="toggles">
            <div className="seg">
              <button className={mode === "overlay" ? "on" : ""} onClick={() => setMode("overlay")}>Overlay by season</button>
              <button className={mode === "timeline" ? "on" : ""} onClick={() => setMode("timeline")}>Full timeline 1988→</button>
            </div>
          </div>
          <div className="chips">
            {DAMS.map((d) => (
              <button key={d.key} className={"chip" + (damKey === d.key ? " on" : "")} onClick={() => setDamKey(d.key)}
                title={d.cap ? `${d.cap} MCM capacity` : "all reservoirs combined"}>
                <span className="chiptop">{d.label}</span>
                {d.cap
                  ? <span className="chipcap"><i style={{ width: `${(d.cap / 115) * 100}%` }} />{d.cap} MCM</span>
                  : <span className="chipcap full"><i style={{ width: "100%" }} />290 MCM</span>}
              </button>
            ))}
          </div>
          {mode === "overlay" && (
            <div className="pinrow">
              <span className="pinlbl">Pin a year:</span>
              {NOTABLE_WET.map((y) => (
                <button key={y} className={"pinchip wet" + (pinned.has(y) ? " on" : "")} onClick={() => togglePin(y)}>{y}</button>
              ))}
              {pinned.size > 0 && <button className="pinclear" onClick={clearPins}>clear ✕</button>}
            </div>
          )}
          {mode === "overlay"
            ? <OverlayChart damKey={damKey} pinned={pinned} togglePin={togglePin} />
            : <TimelineChart damKey={damKey} />}
          {mode === "overlay" && (
            <p className="caveat">Wet years where most big dams topped out and overflowed: 03/04, 11/12, 18/19, 19/20, 21/22. Kouris itself hit 100% in 2004, 2012 and 2020.</p>
          )}
        </div>

        <h2>When does the water actually arrive?</h2>
        <p className="sub">
          Cumulative inflow into the dams, month by month across the water year. A wet year front-loads in
          December–January; this year almost nothing came until February, then March–May did all the work.
        </p>
        <div id="shot-inflow" className="card"><InflowChart /></div>

        <h2>Year by year: drought and deluge</h2>
        <p className="sub">
          Each bar is one water year's average level at Kouris, the island's biggest reservoir and — with a fixed
          115-MCM capacity and a full 1988 record — the fairest yardstick for a climate signal. The striking feature
          isn't a steady decline but the whiplash: collapse years (1990, 1997, 2008, 2024) slamming against
          near-overflow ones (2003, 2012, 2019).
        </p>
        <div id="shot-yearly" className="card"><YearlyTrend /></div>

        <h2>Every reservoir, right now</h2>
        <p className="sub">
          All 21 active dams at the {s.snapshotDate} reading, sorted by capacity. Tap a header to re-sort.
          Storage is wildly uneven: <strong>Kouris alone holds 38% of national capacity, the two biggest dams 56%, the top six 80%</strong> — so a dry Kouris matters far more than a dozen full village dams.
        </p>
        <div id="shot-table"><DamTable /></div>

        <h2>When low water meant restrictions</h2>
        <p className="sub">
          Low dams don't automatically mean dry taps. Since desalination came online after 2008, household cuts
          have largely stopped — recent "restrictions" hit <strong>farmers</strong>, not kitchens. The distinction matters.
        </p>
        <div className="timeline">
          {EVENTS.slice().reverse().map((ev) => (
            <div className="ev" key={ev.label}>
              <div>
                <div className="yr">{ev.label}</div>
                <span className={"sc " + ev.scope}>{ev.scope === "household" ? "Household" : "Agriculture"}</span>
              </div>
              <div className="nt">{ev.note}</div>
            </div>
          ))}
        </div>

        <h2>The cost in the fields</h2>
        <p className="sub">
          When the dams run low it's farms, not taps, that absorb the shock — and the bill lands on crops, exports and
          prices. The dry winter of 2023–24 was formally declared a natural disaster; the deeper 2024–25 drought that
          followed drained reserves to a record low and forced the January 2025 state of emergency.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">−30%</div><div className="tl">Irrigation allocation cut to farmers under the 2024–25 emergency; some Paphos schemes nearly halved (~17 → 8.5 MCM).</div></div>
          <div className="tile"><div className="tv">€10.2M</div><div className="tl">National drought compensation paid to 2,516 growers for 2024 losses (citrus, vegetables, potatoes, avocados) — about €4,000 per grower.</div></div>
          <div className="tile"><div className="tv">+€3.5M</div><div className="tl">EU agricultural-reserve emergency aid to Cyprus (Sept 2025), part of €98.6M shared across five member states.</div></div>
        </div>
        <p className="body" style={{ marginTop: 18 }}>
          So far the damage is uneven, as Halloumi kept setting export records straight through the drought — which is
          surprising given its PDO status needs ≥50% locally grown feed, something scarce water makes harder to supply.
          Other field crops took the hit and consumers felt it: at the peak of the 2024 squeeze tomatoes were retailing
          near €4/kg, watermelon climbed past €1/kg and cherry tomatoes were up roughly 140% year-on-year, as heat and
          scarcer, costlier water thinned harvests and nudged the island toward imported food. But farms and locals are
          only part of the demand on Cyprus's water — the other major party shows up every summer, on a plane.
        </p>

        <h2>The summer squeeze: demand peaks when supply bottoms out</h2>
        <p className="sub">
          Cyprus draws nearly three million visitors a year — about three times its own population — and they arrive in
          a tight summer window, just as the reservoirs slide from their spring peak toward the annual low. Tourism is
          worth 13.5% of GDP, and in peak season parts of the island use up to 500 litres of water per person per day,
          against a European average near 120.
        </p>
        <div id="shot-tourism" className="card"><TourismOverlay /></div>
        <p className="body" style={{ marginTop: 18 }}>
          With the dams already low, Cyprus can't simply pump harder to cover that spike. The permanent desalination
          plants are run flat out year-round — government policy now is to produce <em>"rain or no rain"</em> — so the
          summer surge is met at the margin by emergency capacity: the UAE shipped in mobile units as the 2025 season
          peaked, and the state is subsidising hotels to build their own. Which means the cost of the busy season lands
          on the most expensive water Cyprus has.
        </p>

        <h2>What it costs to stay dry</h2>
        <p className="sub">
          The reassuring half of the story is that your tap won't be cut, as it mostly runs on desalination — which is
          also the most expensive water on the island. Given how expensive it is, a startling share of it never reaches
          a tap.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">€142–147M</div><div className="tl">Budgeted for desalinated water in 2026 alone — over 1% of all government spending (≈ €13.4bn), about €150 per resident or ~€400 per household a year, for a resource that falls free in winter.</div></div>
          <div className="tile"><div className="tv">€1.00–1.50</div><div className="tl">Cost to produce one cubic metre at a coastal plant. Dam water (stored rain) is a small fraction of that.</div></div>
          <div className="tile"><div className="tv">29%</div><div className="tl">Water lost in distribution nationwide — up to 40% in Nicosia's ageing pipes (2025 Audit Office report).</div></div>
          <div className="tile"><div className="tv">€460M</div><div className="tl">Total spent on desalinated water over the six years to 2022, as reliance on it has climbed to around 70% of the drinking-water supply.</div></div>
        </div>
        <div id="shot-costladder" className="card" style={{ marginTop: 18 }}><CostLadder /></div>
        <div className="costcard">
          <div className="costbig">≈ €20–30M<span>/ year</span></div>
          <div className="costlabel">the value of desalinated water that leaks out of the network before it ever reaches a tap — equivalent to roughly 14–21% of the entire desalination budget</div>
          <div className="costwork">
            29% distribution losses × ~70 MCM of desalinated domestic supply (2024) × €1.00–1.50/m³ to produce
            ≈ 20 MCM lost. On a full delivered-cost basis — the ~€145M budget spread over ~70 MCM — it's closer to €40M.
          </div>
          <div className="costcaveat">
            Derived from two sourced figures (Audit Office leak rate × WDD desalination cost). Assumes leaks hit
            desalinated and dam water in proportion to their share of the domestic network — illustrative, not an audited total.
          </div>
        </div>

        <h2>What the leak costs your household</h2>
        <p className="sub">
          Spread across the island's <strong>357,858 households</strong> (2021 census), that wasted desalinated water
          is the most expensive thing leaking out of the ground. The bill isn't itemised on anyone's invoice — but it
          is real money the state spends producing water that never arrives, and it falls unevenly: Nicosia's older
          pipes lose up to 40% against the 29% national average.
        </p>
        <div className="tiles">
          <div className="tile" style={{ borderLeftColor: "var(--c-water-deep)" }}>
            <div className="tv" style={{ color: "var(--c-water-deep)" }}>≈ €56–84</div>
            <div className="tl">per household per year nationwide — the production value of desalinated water lost to leaks before it reaches a tap (midpoint ~€70). On a full delivered-cost basis, closer to €110.</div>
          </div>
          <div className="tile" style={{ borderLeftColor: "var(--c-low)" }}>
            <div className="tv">≈ €95</div>
            <div className="tl">per Nicosia household per year — about 38% above the national average, because the capital's ageing network loses up to 40% versus 29% island-wide.</div>
          </div>
        </div>
        <p className="costcaveat" style={{ color: "var(--muted)" }}>
          Household figures = the leaked-water value above ÷ 357,858 households; the Nicosia split scales by its higher
          loss rate and is illustrative, since desalinated supply isn't published by district. It's the value of water
          lost, not a line a household is billed — and leaks hit dam water and desalinated water alike.
        </p>

        <h2>What it adds up to</h2>
        <p className="body">
          Strip away the year-to-year drama and the shape is clear. Cyprus's rainfall is volatile and trending drier;
          the dams smooth the swings but can no longer cover peak demand; and the gap is increasingly filled by water
          the island manufactures from the sea — at many times the cost of rain, with close to a fifth of the
          desalination budget leaking away before it arrives. The 2026 rebound is real, but it is weather, not a fix.
        </p>
        <p className="body" style={{ marginTop: 16 }}>
          Fixing those leaks is the cheapest water Cyprus could find — every cubic metre saved is one it doesn't have to
          desalinate — and the state has begun to spend on it. The 2026 water budget runs to €196M, the largest ever:
          mostly desalination production, but with money ring-fenced to cut network losses. A separate €8M was approved
          in 2025 for local authorities to upgrade pipes, and the EU-co-financed Thaleia programme (2021–27) adds around
          €230M for water resilience — including €7.5M to replace ageing pipelines in Limassol and €11M across the five
          district water bodies to chase down losses. The official target is to bring losses from roughly 40% down to 20%.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">~5%</div><div className="tl">Netherlands — among the lowest leakage in Europe (Germany ~6%, Denmark ~8%), on newer mains and aggressive detection.</div></div>
          <div className="tile"><div className="tv">~25%</div><div className="tl">EU average for non-revenue water; the global average is closer to 30%.</div></div>
          <div className="tile" style={{ borderLeftColor: "var(--c-low)" }}><div className="tv" style={{ color: "var(--c-low)" }}>~29%</div><div className="tl">Cyprus nationwide — and up to 40% in Nicosia's older network, near the top of the EU range.</div></div>
          <div className="tile"><div className="tv">~42%</div><div className="tl">Italy — Europe's worst, after decades of under-investment (historically only ~€11 per person a year).</div></div>
        </div>
        <p className="body" style={{ marginTop: 18 }}>
          Cyprus is not unusual in facing this bill. The EU as a whole spends about €100bn a year on water supply and
          sanitation and, on OECD estimates, needs to lift that by more than a quarter — toward €290bn a year by 2030 —
          simply to keep ageing networks compliant; Cyprus already devotes an above-average share of its GDP to water.
          Others are paying to catch up: England and Wales, leaking about a fifth, have been cleared to spend over
          £700M on leakage reduction alone this regulatory cycle. The difference for Cyprus is leverage — because its
          marginal water is desalinated rather than rained-for, every point of leakage it removes is worth far more than
          the same repair in a wetter country. Which is why the leak, not the drought, may be the cheapest problem to fix.
        </p>

        <div className="foot">
          <p><strong>Sources.</strong> Reservoir data: Cyprus Water Development Department, via <a href="https://fragmata.info" target="_blank" rel="noreferrer">fragmata.info</a> (open data, Vladimir Bugay); bi-monthly storage Jan 1988 → Jun 2026. Tourism, halloumi exports, GDP and fiscal figures: CYSTAT (some via Cyprus Mail reporting). Household counts (357,858; avg 2.57 persons) and district shares: CYSTAT 2021 Census of Population and Housing (government-controlled areas). Per-capita consumption (up to ~500 L/day in places against a ~120 L European average): Smart Water Magazine, Feb 2026. Produce prices (2024): Cyprus Mail and the agriculture ministry's e-kofini platform. Agriculture support: Cyprus Ministry of Agriculture and European Commission. Desalination costs and leakage: Water Development Department and the 2025 Audit Office report, via Cyprus Mail. Fix-cost commitments (€196M 2026 budget; €8M leak-reduction tranche; €230M Thaleia 2021–27 programme): Cyprus government, via Politis and Cyprus Mail. Comparative water-sector spending and investment needs: OECD / European Commission (2020) and Water Europe (2024); national leakage rates: EEA and peer-reviewed compilations; England & Wales leakage allowance: Ofwat PR24 (2024). Restriction periods are hand-compiled from press and policy reporting and are indicative, not an official register. The leakage-cost and per-household figures are derived, not official (see calculations above).</p>
          <p style={{ marginTop: 10 }}>Snapshot frozen {s.snapshotDate}. Figures are storage as a share of each reservoir's capacity (MCM = million cubic metres).</p>
        </div>
      </div>
    </div>
  );
}
