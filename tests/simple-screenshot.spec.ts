import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3001';
const OUTPUT_DIR = path.join(__dirname, '../artifacts/production-audit/verification');

test.beforeAll(() => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
});

test('Homepage full verification with image wait', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Wait for all images to load
  await page.waitForFunction(() => {
    const images = document.querySelectorAll('img');
    return Array.from(images).every(img => img.complete && img.naturalHeight > 0);
  }, { timeout: 10000 }).catch(() => console.log('Some images may not have loaded'));
  
  // Extra wait for animations
  await page.waitForTimeout(2000);
  
  // Scroll through the page to trigger lazy loading
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const height = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let i = 0; i < height; i += step) {
      window.scrollTo(0, i);
      await delay(200);
    }
    window.scrollTo(0, 0);
    await delay(500);
  });
  
  // Wait again for images after scrolling
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'home-full-verified.png'),
    fullPage: true,
  });
  
  // Also capture specific sections
  const aboutSection = page.locator('section').filter({ hasText: 'About CWAG' }).first();
  if (await aboutSection.isVisible()) {
    await aboutSection.screenshot({
      path: path.join(OUTPUT_DIR, 'about-section.png'),
    });
  }
});

test('Check image loading status', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Check all images
  const imageStatus = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    return Array.from(images).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height,
      displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
    }));
  });
  
  console.log('Image status:', JSON.stringify(imageStatus, null, 2));
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'image-status.json'),
    JSON.stringify(imageStatus, null, 2)
  );
});
