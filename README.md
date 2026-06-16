# Cyprus Dams & Water Supply

An interactive data piece on how Cyprus stores, drains and pays for its water:
four decades of reservoir history, the seasonal fill-and-empty cycle, monthly
inflow, every dam's live level, the restriction record, and what it now costs to
keep the taps running when the rain doesn't come.
🔗 Live: [https://cyprus-water-analysis.vercel.app](https://cyprus-water-analysis.vercel.app/)  ·  Read the full piece, interactive charts and all.

Static React site (Vite). No backend. Data is a single JSON snapshot that a
weekly GitHub Action regenerates from the live [fragmata.info](https://fragmata.info)
API, so the site stays current without going dynamic.

## What it is
A self-contained, dependency-light web piece that turns messy public water data
into one defensible story. It pairs a written analysis with hand-built interactive
charts, and keeps itself current automatically — no backend, no database, no server
to babysit. Built as an end-to-end exercise: sourcing → pipeline → analysis →
visualisation → deploy.

## What's interesting under the hood
- Self-updating static site. Data is decoupled into JSON and imported at build
time. A weekly GitHub Action pulls the live source, runs sanity checks, and
commits only if something changed — the push triggers a Vercel redeploy. The
site stays current without ever going dynamic.
- One dataset from many sources. ~985 rows of bi-monthly reservoir storage back
to 1988 (reverse-engineered from a public reservoir API), plus tourism, exports,
GDP, fiscal and agricultural figures from CYSTAT, Eurostat, OECD/EU and official
reporting — reconciled into a single schema.
- Hand-rolled SVG charts, no charting library. The year-overlay (click to pin
seasons), cumulative inflow curves, annual trend with a moving average, the
sortable reservoir table and the cost ladder are all built from first principles
for full control of the editorial design.
- Methodology kept honest. Estimated-vs-exact data is flagged in the UI; money
is contextualised with meaningful denominators; and every figure that is derived
rather than reported is labelled as such, with the working shown (see below).

## The charts
- How the dams fill across a water year · when the inflow actually arrives · year-by-year
drought-and-deluge trend · every reservoir's current level (sortable) · the
summer demand squeeze vs. tourism · the cost ladder of different water sources ·
and a per-household breakdown of what network leakage costs.

## Data & sources
- Reservoir data originates with the Cyprus Water Development Department and is
consumed via fragmata.info (open source, Vladimir Bugay).
- Surrounding figures come from CYSTAT, Eurostat, the OECD/European
Commission, Ofwat (peer leakage comparison) and official/press reporting. Full
attribution lives in the article footer.

## Methodology & honesty notes
The distinction matters and is stated throughout:

- Reported, official: reservoir levels and capacities; the leakage rates
(~29% nationwide, up to ~40% in Nicosia) and the government's 40%→20% target;
budgets; halloumi/export and macro figures.
- Derived (mine, from the above): the euro cost of leakage (≈€20–30M/yr,
~a fifth of the desalination budget) — computed as the loss rate × the
desalinated share of domestic supply × production cost per m³, not a naive
total × cost — and the per-household version of that figure. Both are labelled
as estimates in the piece.


## Tech
React + Vite, plain CSS, hand-written SVG. No backend, no chart library, no browser
data fetching. GitHub Actions for the scheduled data refresh; Vercel for hosting and
auto-deploy.

## Development
bashnpm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build

- Data refresh: npm run refresh rebuilds src/data/snapshot.json from the
fragmata endpoints with sanity checks; .github/workflows/refresh.yml runs it
every Monday and on demand.
- Deploy: import the repo on Vercel (it reads vercel.json — build npm run build, output dist). Cloudflare Pages and GitHub Pages also work (base: './'
keeps asset paths relative under a subpath).
- Chart images: npm run build then npx playwright install chromium then
npm run export:images writes retina PNGs of each chart to exports/.

## Attribution & fair use
Underlying reservoir data is published by the Cyprus Water Development Department and
consumed via fragmata.info; keep the footer credit and review fragmata's license
before reusing its derived data commercially. Restriction-period annotations are
hand-compiled from press and policy reporting and are indicative, not an official
register. Derived cost figures are estimates, not official statistics.
