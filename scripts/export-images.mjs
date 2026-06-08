// Export crisp PNGs of each chart for the Medium cross-post.
//
// Usage (run locally, not in CI):
//   npm run build
//   npx playwright install chromium   # one-time, downloads a headless browser
//   npm run export:images
//
// Output: ./exports/*.png at 2x device scale (retina-sharp), sized for Medium.
// These are static stills — pair them in the Medium post with a "View the
// interactive version" link back to your hosted site.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { existsSync } from "node:fs";

const DIST = resolve("dist");
const OUT = resolve("exports");

if (!existsSync(DIST)) {
  console.error('No dist/ folder found. Run "npm run build" first.');
  process.exit(1);
}

// Each chart, by the id added in App.jsx. Order = reading order.
const SHOTS = [
  { id: "shot-stats", name: "01-hero-stats" },
  { id: "shot-overlay", name: "02-fill-overlay" },
  { id: "shot-inflow", name: "03-inflow" },
  { id: "shot-yearly", name: "04-yearly-trend" },
  { id: "shot-table", name: "05-reservoir-table" },
  { id: "shot-tourism", name: "06-tourism-overlay" },
  { id: "shot-costladder", name: "07-cost-ladder" },
];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      let url = decodeURIComponent(req.url.split("?")[0]);
      if (url === "/") url = "/index.html";
      let file = join(DIST, url);
      if (!existsSync(file)) file = join(DIST, "index.html"); // SPA fallback
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });
  return new Promise((res) => server.listen(0, () => res(server)));
}

const main = async () => {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error('Playwright not installed. Run "npm install" then "npx playwright install chromium".');
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });
  const server = await startServer();
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}/`;

  const browser = await chromium.launch();
  // 1320 CSS px wide @2x ≈ 2640px export — comfortably above Medium's display width.
  const page = await browser.newPage({ viewport: { width: 1320, height: 1000 }, deviceScaleFactor: 2 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(600); // let fonts + reveal animations settle

  for (const { id, name } of SHOTS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) {
      console.warn(`  skip ${name} (no #${id})`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await el.screenshot({ path: join(OUT, `${name}.png`) });
    console.log(`  wrote exports/${name}.png`);
  }

  await browser.close();
  server.close();
  console.log("\nDone. PNGs are in ./exports — drop them into the Medium draft.");
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
