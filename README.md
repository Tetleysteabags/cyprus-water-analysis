# Cyprus Dams

An interactive look at Cyprus's reservoirs: how they fill and empty across the
water year, four decades of storage history, monthly inflow, every dam's current
level, and when low water has actually meant restrictions.

Static React site (Vite). No backend. Data is a single JSON snapshot that a
weekly GitHub Action regenerates from the live [fragmata.info](https://fragmata.info)
API, so the site stays current without going dynamic.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## How the data works

- **`src/data/snapshot.json`** is the single source of truth. `App.jsx` imports it
  at build time — nothing is fetched in the browser.
- **`scripts/refresh-data.mjs`** rebuilds that file from four fragmata endpoints
  (`/summary`, `/reservoirs`, `/inflow`, `/historical`) and runs sanity checks
  before writing. Run it anytime with `npm run refresh`.
- **`.github/workflows/refresh.yml`** runs the script every Monday (and on demand
  via the Actions tab). If the snapshot changed, it commits the new file; the push
  triggers your host to redeploy. If nothing changed, it does nothing.

To change which dams appear as individual lines in the seasonal chart, edit both
`HISTORY_DAMS` in the refresh script and the `DAMS` array in `App.jsx`.

## Deploy on Vercel (recommended)

Free, custom domain, and it auto-redeploys on every push — including the weekly
data commit from the Action, so the live article stays current with no manual step.

1. Push this repo to GitHub (project root = repo root).
2. vercel.com → **Add New → Project** → import the repo. Vercel detects Vite and
   reads `vercel.json` (build `npm run build`, output `dist`). Click **Deploy**.
3. **Settings → Domains** → add your domain (or use the free `*.vercel.app` URL).

That URL is now the canonical, interactive version of the piece. Every later push —
including the Monday data commit — redeploys automatically.

> Vercel's free **Hobby** tier is for personal/non-commercial use, which fits a
> personal article. **Cloudflare Pages** (import repo, build `npm run build`, output
> `dist`) has no such clause and is an equally good drop-in. **GitHub Pages** also
> works; `base: './'` in `vite.config.js` keeps asset paths relative under a subpath.

## Publishing on Medium (keeps the interactivity, elsewhere)

Medium can't run this app — it only embeds from its Embedly allow-list, so a custom
iframe just becomes a link card. The clean pattern:

1. Deploy to your own URL first (above) — that's the canonical home.
2. Generate stills: `npm run build` then `npm run export:images` (see below).
3. Write the narrative on your site, then use Medium's **Import a story** tool with
   your URL. Medium sets `rel=canonical` back to your site automatically, so you get
   Medium's reach without a duplicate-content penalty and with SEO credited to you.
4. In the Medium draft, place each exported PNG where its chart belongs and add a
   prominent **"▶ Explore the interactive version"** link near the top and beside
   each image. A short screen-recording GIF of the year-overlay or cost-ladder sells
   the interactivity better than a still — record one manually and drop it in too.

For a blog you fully control (self-hosted Ghost/WordPress), you can instead `<iframe>`
the deployed URL directly and keep everything live inline. Substack and Medium can't.

## Export chart images (`npm run export:images`)

Produces retina-sharp PNGs of each chart for the Medium cross-post.

```bash
npm run build
npx playwright install chromium   # one-time, downloads a headless browser
npm run export:images             # -> exports/01-hero-stats.png, 02-fill-overlay.png, ...
```

The script serves `dist/`, screenshots each `#shot-*` element at 2× scale, and writes
to `exports/` (gitignored). To add or reorder shots, edit the `SHOTS` list in
`scripts/export-images.mjs`; the `id`s live on the chart wrappers in `App.jsx`.

## Attribution & fair use

Underlying data is published by the **Cyprus Water Development Department**. This
project consumes it via **fragmata.info** (Vladimir Bugay), which is open source.
Keep the credit in the footer, cache rather than poll aggressively (the weekly job
is deliberately light), and review fragmata's repository license before reusing its
derived data commercially. Restriction-period annotations are hand-compiled from
press and policy reporting and are indicative, not an official register.
