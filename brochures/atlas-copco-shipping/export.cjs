// Renders each brochure variation to a print-ready Letter PDF and a 2x PNG preview.
// Usage: node export.cjs [name ...]   (needs Playwright + Chromium)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const all = ['v1-clean-corporate', 'v2-blueprint-hero', 'v3-spec-sheet'];
const pages = process.argv.length > 2 ? process.argv.slice(2) : all;
const outDir = path.join(__dirname, 'exports');

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
  for (const name of pages) {
    const page = await context.newPage();
    await page.emulateMedia({ media: 'print' });
    await page.goto('file://' + path.join(__dirname, name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const sheet = document.querySelector('.sheet');
      return sheet.scrollHeight - sheet.clientHeight;
    });
    if (overflow > 0) console.warn(`${name}: content overflows the page by ${overflow}px`);
    await page.screenshot({ path: path.join(outDir, name + '.png'), clip: { x: 0, y: 0, width: 816, height: 1056 } });
    await page.pdf({ path: path.join(outDir, name + '.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
    await page.close();
    console.log('exported', name);
  }
  await browser.close();
})();
