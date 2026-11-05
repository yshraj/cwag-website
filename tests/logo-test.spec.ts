import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3002';

test.describe('Logo Integration Test', () => {
  
  test('Logo visible in navbar - light mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Scroll to trigger navbar background change
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/navbar-scrolled-light.png',
      clip: { x: 0, y: 0, width: 400, height: 100 }
    });
    
    // Check logo image is present
    const logoImg = page.locator('nav img[alt="CWAG Logo"]').first();
    await expect(logoImg).toBeVisible();
  });

  test('Logo visible in navbar - dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    // Scroll to trigger navbar background change
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/navbar-scrolled-dark.png',
      clip: { x: 0, y: 0, width: 400, height: 100 }
    });
  });

  test('Logo visible in hero section - before scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/navbar-hero-light.png',
      clip: { x: 0, y: 0, width: 400, height: 100 }
    });
  });

  test('Logo visible in footer - light mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    
    // Find footer logo
    const footerLogo = page.locator('footer img[alt="CWAG Logo"]').first();
    if (await footerLogo.count() > 0) {
      await footerLogo.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
    }
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/footer-light.png',
      clip: { x: 0, y: 0, width: 1280, height: 400 }
    });
  });

  test('Logo visible in footer - dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/footer-dark.png',
      clip: { x: 0, y: 0, width: 1280, height: 400 }
    });
  });

  test('Mobile navbar logo', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/logo/navbar-mobile.png',
      clip: { x: 0, y: 0, width: 375, height: 100 }
    });
  });
});
