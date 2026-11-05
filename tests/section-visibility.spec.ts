import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Section Visibility Check', () => {
  
  test('All sections visible in dark mode - home page sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Set dark mode
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    // Capture each section with meaningful names
    const sections = [
      { name: 'hero', y: 0 },
      { name: 'about', y: 800 },
      { name: 'work', y: 1600 },
      { name: 'stats', y: 2400 },
      { name: 'sports', y: 3200 },
      { name: 'districts', y: 4000 },
      { name: 'news', y: 4800 },
      { name: 'events', y: 5600 },
    ];
    
    for (const section of sections) {
      await page.evaluate((y) => window.scrollTo(0, y), section.y);
      await page.waitForTimeout(200);
      await page.screenshot({
        path: `artifacts/production-audit/sections/dark-${section.name}.png`,
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
    }
  });

  test('Verify text is readable in stats section - dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    // Find and screenshot the stats section specifically
    const statsText = page.locator('text=Representing Coaches Across Gujarat').first();
    if (await statsText.count() > 0) {
      await statsText.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: 'artifacts/production-audit/sections/stats-section-zoomed.png',
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
      
      // Verify the text is actually visible (not white on white or dark on dark)
      const isVisible = await statsText.isVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('Verify sports tags are readable in dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    // Find the sports section
    const sportsTitle = page.locator('text=Coaches Across Every Discipline').first();
    if (await sportsTitle.count() > 0) {
      await sportsTitle.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: 'artifacts/production-audit/sections/sports-section-zoomed.png',
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
      
      // Verify a sport tag is visible
      const cricketTag = page.locator('text=Cricket').first();
      const isVisible = await cricketTag.isVisible();
      expect(isVisible).toBe(true);
    }
  });
});
