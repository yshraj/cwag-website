import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3001';
const ARTIFACTS_DIR = path.join(__dirname, '../artifacts/final-review');

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'membership', path: '/membership' },
  { name: 'news', path: '/news' },
  { name: 'events', path: '/events' },
  { name: 'contact', path: '/contact' },
  { name: 'directory', path: '/directory' },
  { name: 'register', path: '/register' },
];

// Collect all issues found during testing
const issues: string[] = [];
const consoleErrors: string[] = [];
const networkErrors: string[] = [];
const brokenImages: string[] = [];

test.describe('CWAG Website Visual Audit', () => {
  
  test.beforeAll(async () => {
    // Ensure directories exist
    for (const viewport of Object.keys(viewports)) {
      const dir = path.join(ARTIFACTS_DIR, viewport);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  });

  // Test each page at each viewport
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    test.describe(`${viewportName} (${viewport.width}x${viewport.height})`, () => {
      
      for (const pageConfig of pages) {
        test(`${pageConfig.name} page - capture and audit`, async ({ page }) => {
          await page.setViewportSize(viewport);
          
          // Collect console errors
          page.on('console', msg => {
            if (msg.type() === 'error') {
              consoleErrors.push(`[${pageConfig.name}] ${msg.text()}`);
            }
          });

          // Collect network errors
          page.on('requestfailed', request => {
            networkErrors.push(`[${pageConfig.name}] ${request.url()} - ${request.failure()?.errorText}`);
          });

          // Navigate to page
          const response = await page.goto(`${BASE_URL}${pageConfig.path}`, {
            waitUntil: 'networkidle',
            timeout: 30000,
          });

          // Check response status
          expect(response?.status()).toBeLessThan(400);

          // Wait for content to load
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(1000); // Allow animations to settle

          // Take full page screenshot
          const screenshotPath = path.join(ARTIFACTS_DIR, viewportName, `${pageConfig.name}-full.png`);
          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
          });

          // Take viewport screenshot
          const viewportScreenshotPath = path.join(ARTIFACTS_DIR, viewportName, `${pageConfig.name}-viewport.png`);
          await page.screenshot({
            path: viewportScreenshotPath,
            fullPage: false,
          });

          // Check for broken images
          const images = await page.locator('img').all();
          for (const img of images) {
            const src = await img.getAttribute('src');
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            if (naturalWidth === 0 && src) {
              brokenImages.push(`[${pageConfig.name}] ${src}`);
            }
          }

          // Basic accessibility checks
          const h1Count = await page.locator('h1').count();
          if (h1Count === 0) {
            issues.push(`[${pageConfig.name}] Missing h1 element`);
          }
          if (h1Count > 1) {
            issues.push(`[${pageConfig.name}] Multiple h1 elements (${h1Count})`);
          }

          // Check for empty alt texts
          const imagesWithoutAlt = await page.locator('img:not([alt])').count();
          if (imagesWithoutAlt > 0) {
            issues.push(`[${pageConfig.name}] ${imagesWithoutAlt} images without alt text`);
          }
        });
      }
    });
  }

  // Language switching test
  test('Language switching EN <-> GU', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Find and click language toggle
    const langButton = page.locator('button:has-text("ગુ"), button:has-text("EN")').first();
    
    // Get initial text
    const initialHeading = await page.locator('h1').first().textContent();
    
    // Click to switch language
    await langButton.click();
    await page.waitForTimeout(500);

    // Get new text
    const newHeading = await page.locator('h1').first().textContent();

    // Verify language changed
    expect(newHeading).not.toBe(initialHeading);

    // Take screenshot of Gujarati version
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'desktop', 'home-gujarati.png'),
      fullPage: true,
    });

    // Switch back
    await langButton.click();
    await page.waitForTimeout(500);
  });

  // Theme switching test
  test('Theme switching light <-> dark', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Take light mode screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'desktop', 'home-light-theme.png'),
      fullPage: false,
    });

    // Find theme toggle (usually has moon/sun icon or "theme" in aria-label)
    const themeToggle = page.locator('button[aria-label*="theme"], button:has(svg)').filter({
      has: page.locator('svg'),
    }).last();

    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);

      // Check if dark mode is applied
      const isDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') || 
               document.body.classList.contains('dark');
      });

      // Take dark mode screenshot
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'desktop', `home-dark-theme.png`),
        fullPage: false,
      });
    }
  });

  // Navigation test
  test('Navigation works correctly', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Test each nav link
    const navLinks = [
      { text: 'About', expectedPath: '/about' },
      { text: 'Membership', expectedPath: '/membership' },
      { text: 'News', expectedPath: '/news' },
      { text: 'Contact', expectedPath: '/contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`a:has-text("${link.text}")`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForURL(`**${link.expectedPath}`, { timeout: 5000 });
        expect(page.url()).toContain(link.expectedPath);
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    }
  });

  // Mobile navigation test
  test('Mobile navigation menu', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Look for hamburger menu button
    const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').filter({
      hasText: '',
    });

    // Try to find and click mobile menu
    const hamburger = page.locator('button').filter({
      has: page.locator('svg'),
    }).last();

    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(500);

      // Take screenshot of open mobile menu
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'mobile', 'home-menu-open.png'),
        fullPage: false,
      });
    }
  });

  // Report all issues at the end
  test.afterAll(async () => {
    const reportPath = path.join(ARTIFACTS_DIR, 'audit-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      consoleErrors,
      networkErrors,
      brokenImages,
      issues,
      summary: {
        totalConsoleErrors: consoleErrors.length,
        totalNetworkErrors: networkErrors.length,
        totalBrokenImages: brokenImages.length,
        totalIssues: issues.length,
      },
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Also create a text summary
    const textReport = `
CWAG Website Audit Report
========================
Generated: ${report.timestamp}

SUMMARY
-------
Console Errors: ${report.summary.totalConsoleErrors}
Network Errors: ${report.summary.totalNetworkErrors}
Broken Images: ${report.summary.totalBrokenImages}
Other Issues: ${report.summary.totalIssues}

CONSOLE ERRORS
--------------
${consoleErrors.length > 0 ? consoleErrors.join('\n') : 'None'}

NETWORK ERRORS
--------------
${networkErrors.length > 0 ? networkErrors.join('\n') : 'None'}

BROKEN IMAGES
-------------
${brokenImages.length > 0 ? brokenImages.join('\n') : 'None'}

OTHER ISSUES
------------
${issues.length > 0 ? issues.join('\n') : 'None'}
`;

    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'audit-report.txt'), textReport);
  });
});
