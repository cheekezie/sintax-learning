import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

await page.goto('http://localhost:5173/course/6a81325a20fbc41e12e8c051', { waitUntil: 'networkidle' });
await page.waitForSelector('h1');
await page.waitForTimeout(800);

const overflow = await page.evaluate(() => {
  const doc = document.documentElement;
  return {
    scrollWidth: doc.scrollWidth,
    clientWidth: doc.clientWidth,
    overflowingBy: doc.scrollWidth - doc.clientWidth,
  };
});
console.log('Horizontal overflow check:', overflow);

await page.screenshot({ path: '/private/tmp/claude-501/-Users-cheekezie-Documents-sintax-sintax-learning/9e880af3-943d-43e6-80b8-7dac743baec1/scratchpad/course-detail-mobile.png', fullPage: true });

await browser.close();
console.log('DONE');
