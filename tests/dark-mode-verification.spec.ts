import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/membership', name: 'membership' },
  { path: '/events', name: 'events' },
  { path: '/news', name: 'news' },
  { path: '/directory', name: 'directory' },
  { path: '/contact', name: 'contact' },
  { path: '/register', name: 'register' },
];

test.describe('Dark Mode Verification After CSS Fix', () => {
  
  test('Capture all pages in dark mode - full page', async ({ page }) => {
    for (const route of routes) {
      // Set dark mode
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });
      
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      
      // Ensure dark mode is active
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      
      // Wait for content to stabilize
      await page.waitForTimeout(500);
      
      // Scroll to load all lazy images
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const scrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        for (let scrollY = 0; scrollY <= scrollHeight; scrollY += viewportHeight / 2) {
          window.scrollTo(0, scrollY);
          await delay(100);
        }
        window.scrollTo(0, 0);
      });
      
      await page.waitForTimeout(300);
      
      // Take full page screenshot
      await page.screenshot({
        path: `artifacts/production-audit/dark-mode-fix/${route.name}-full.png`,
        fullPage: true
      });
    }
  });

  test('Verify button contrast in dark mode - home page', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    // Find all primary buttons
    const primaryButtons = await page.locator('button, a[href]').filter({
      has: page.locator(':text("Join CWAG"), :text("Get Started"), :text("Learn More"), :text("Contact")')
    }).all();
    
    // Screenshot hero section with CTA buttons
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/home-hero-buttons.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    
    // Scroll to features/stats section
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/home-stats-section.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('Verify membership page buttons in dark mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/membership`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    // Screenshot hero
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/membership-hero.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
    
    // Scroll to pricing cards
    const pricingSection = page.locator('section:has-text("Membership Plans")').first();
    if (await pricingSection.count() > 0) {
      await pricingSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: 'artifacts/production-audit/dark-mode-fix/membership-pricing.png',
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
    }
  });

  test('Verify contact form in dark mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/contact-form.png',
      fullPage: true
    });
  });

  test('Verify registration form in dark mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/register-form.png',
      fullPage: true
    });
  });

  test('Light mode comparison - home page', async ({ page }) => {
    // Force light mode
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(500);
    
    // Scroll through page
    await page.evaluate(async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      for (let scrollY = 0; scrollY <= scrollHeight; scrollY += viewportHeight / 2) {
        window.scrollTo(0, scrollY);
        await delay(100);
      }
      window.scrollTo(0, 0);
    });
    
    await page.waitForTimeout(300);
    
    await page.screenshot({
      path: 'artifacts/production-audit/dark-mode-fix/home-light-full.png',
      fullPage: true
    });
  });
});
