import { test } from '@playwright/test';

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

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

const themes = ['light', 'dark'] as const;

test.describe('Final Production Screenshots', () => {
  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`All routes - ${viewport.name} - ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        for (const route of routes) {
          // Set theme
          await page.addInitScript((t) => {
            localStorage.setItem('theme', t);
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }, theme);
          
          await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
          
          // Ensure theme is applied
          await page.evaluate((t) => {
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }, theme);
          
          await page.waitForTimeout(300);
          
          // Scroll to load all content
          await page.evaluate(async () => {
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            const scrollHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            for (let y = 0; y <= scrollHeight; y += viewportHeight / 2) {
              window.scrollTo(0, y);
              await delay(50);
            }
            window.scrollTo(0, 0);
          });
          
          await page.waitForTimeout(200);
          
          await page.screenshot({
            path: `artifacts/production-audit/production/${viewport.name}/${theme}/${route.name}.png`,
            fullPage: true,
          });
        }
      });
    }
  }
});
