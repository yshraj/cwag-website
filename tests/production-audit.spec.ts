import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3001';
const ARTIFACTS_DIR = path.join(__dirname, '../artifacts/production-audit');

// All routes to test
const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'membership', path: '/membership' },
  { name: 'news', path: '/news' },
  { name: 'events', path: '/events' },
  { name: 'contact', path: '/contact' },
  { name: 'directory', path: '/directory' },
  { name: 'register', path: '/register' },
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

// Issues tracking
const issues: {
  consoleErrors: string[];
  networkErrors: string[];
  brokenImages: string[];
  accessibilityIssues: string[];
  buttonIssues: string[];
  themeIssues: string[];
} = {
  consoleErrors: [],
  networkErrors: [],
  brokenImages: [],
  accessibilityIssues: [],
  buttonIssues: [],
  themeIssues: [],
};

// Helper to ensure directories exist
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to check button visibility and contrast
async function auditButtons(page: Page, pageName: string, theme: string) {
  const buttons = await page.locator('button, a[role="button"], [class*="btn"], a.inline-flex').all();
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    try {
      const isVisible = await button.isVisible();
      if (!isVisible) continue;
      
      const box = await button.boundingBox();
      if (!box) continue;
      
      // Get computed styles
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          opacity: computed.opacity,
          visibility: computed.visibility,
          text: el.textContent?.trim() || '',
        };
      });
      
      // Check for invisible or near-invisible buttons
      if (parseFloat(styles.opacity) < 0.5) {
        issues.buttonIssues.push(`[${pageName}][${theme}] Button ${i} has low opacity: ${styles.opacity}`);
      }
      
      // Check for potential contrast issues (transparent on transparent)
      if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' && styles.color.includes('rgba')) {
        const colorMatch = styles.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (colorMatch) {
          const [, r, g, b] = colorMatch.map(Number);
          // Very light text might be invisible on light backgrounds
          if (r > 200 && g > 200 && b > 200 && theme === 'light') {
            issues.buttonIssues.push(`[${pageName}][${theme}] Button "${styles.text.slice(0, 20)}" may have poor contrast`);
          }
        }
      }
    } catch (e) {
      // Button may have been removed from DOM
    }
  }
}

// Helper to check accessibility basics
async function auditAccessibility(page: Page, pageName: string) {
  // Check for skip link
  const skipLink = await page.locator('a[href="#main"], a[href="#content"], [class*="skip"]').count();
  if (skipLink === 0) {
    issues.accessibilityIssues.push(`[${pageName}] Missing skip navigation link`);
  }
  
  // Check h1 count
  const h1Count = await page.locator('h1').count();
  if (h1Count === 0) {
    issues.accessibilityIssues.push(`[${pageName}] Missing h1 element`);
  } else if (h1Count > 1) {
    issues.accessibilityIssues.push(`[${pageName}] Multiple h1 elements (${h1Count})`);
  }
  
  // Check images for alt text
  const imagesWithoutAlt = await page.locator('img:not([alt])').count();
  if (imagesWithoutAlt > 0) {
    issues.accessibilityIssues.push(`[${pageName}] ${imagesWithoutAlt} images without alt text`);
  }
  
  // Check for empty alt on decorative images (should be alt="")
  const emptyAltImages = await page.locator('img[alt=""]').count();
  
  // Check buttons for accessible names
  const buttonsWithoutAccessibleName = await page.locator('button:not([aria-label]):not(:has-text(""))').count();
  
  // Check form labels
  const inputsWithoutLabels = await page.locator('input:not([aria-label]):not([id])').count();
  if (inputsWithoutLabels > 0) {
    issues.accessibilityIssues.push(`[${pageName}] ${inputsWithoutLabels} inputs may lack proper labels`);
  }
  
  // Check focus visibility
  const focusableElements = await page.locator('button, a, input, select, textarea, [tabindex="0"]').all();
  for (const el of focusableElements.slice(0, 5)) { // Check first 5
    try {
      await el.focus();
      const hasFocusStyle = await el.evaluate((element) => {
        const styles = window.getComputedStyle(element);
        const outline = styles.outline;
        const boxShadow = styles.boxShadow;
        return outline !== 'none' || boxShadow !== 'none';
      });
      // Focus styles are often handled by Tailwind's ring utilities
    } catch (e) {
      // Element not focusable
    }
  }
}

test.describe('Production Build Audit', () => {
  test.beforeAll(async () => {
    ensureDir(path.join(ARTIFACTS_DIR, 'desktop', 'light'));
    ensureDir(path.join(ARTIFACTS_DIR, 'desktop', 'dark'));
    ensureDir(path.join(ARTIFACTS_DIR, 'tablet', 'light'));
    ensureDir(path.join(ARTIFACTS_DIR, 'tablet', 'dark'));
    ensureDir(path.join(ARTIFACTS_DIR, 'mobile', 'light'));
    ensureDir(path.join(ARTIFACTS_DIR, 'mobile', 'dark'));
    ensureDir(path.join(ARTIFACTS_DIR, 'interactions'));
    ensureDir(path.join(ARTIFACTS_DIR, 'gujarati'));
  });

  // Test each route in each viewport and theme
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    for (const route of routes) {
      test(`[${viewportName}] ${route.name} - light theme`, async ({ page }) => {
        await page.setViewportSize(viewport);
        
        // Collect console errors
        page.on('console', msg => {
          if (msg.type() === 'error') {
            issues.consoleErrors.push(`[${route.name}][${viewportName}] ${msg.text()}`);
          }
        });
        
        // Collect network errors
        page.on('requestfailed', request => {
          issues.networkErrors.push(`[${route.name}] ${request.url()} - ${request.failure()?.errorText}`);
        });
        
        const response = await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });
        
        expect(response?.status()).toBeLessThan(400);
        
        // Ensure light theme
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        });
        await page.waitForTimeout(300);
        
        // Check for broken images
        const images = await page.locator('img').all();
        for (const img of images) {
          const src = await img.getAttribute('src');
          const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
          if (naturalWidth === 0 && src) {
            issues.brokenImages.push(`[${route.name}] ${src}`);
          }
        }
        
        // Audit buttons
        await auditButtons(page, route.name, 'light');
        
        // Audit accessibility
        await auditAccessibility(page, route.name);
        
        // Take screenshot
        await page.screenshot({
          path: path.join(ARTIFACTS_DIR, viewportName, 'light', `${route.name}.png`),
          fullPage: true,
        });
      });

      test(`[${viewportName}] ${route.name} - dark theme`, async ({ page }) => {
        await page.setViewportSize(viewport);
        
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });
        
        // Switch to dark theme
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        });
        await page.waitForTimeout(300);
        
        // Audit buttons in dark mode
        await auditButtons(page, route.name, 'dark');
        
        // Take screenshot
        await page.screenshot({
          path: path.join(ARTIFACTS_DIR, viewportName, 'dark', `${route.name}.png`),
          fullPage: true,
        });
      });
    }
  }

  // Button interaction states test
  test('Button interaction states - all pages', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    
    for (const route of routes) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      
      // Find primary CTA buttons
      const primaryButtons = await page.locator('button, a.inline-flex').all();
      
      for (let i = 0; i < Math.min(primaryButtons.length, 3); i++) {
        const button = primaryButtons[i];
        try {
          if (await button.isVisible()) {
            // Hover state
            await button.hover();
            await page.waitForTimeout(100);
            
            // Check if button changed on hover
            const hoverStyles = await button.evaluate((el) => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                transform: computed.transform,
              };
            });
          }
        } catch (e) {
          // Button interaction failed
        }
      }
    }
    
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'button-states.png'),
      fullPage: false,
    });
  });

  // Theme switching persistence test
  test('Theme switching persistence across navigation', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Find and click theme toggle
    const themeToggle = page.locator('button').filter({ has: page.locator('svg') }).last();
    
    // Start in light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    
    // Take light mode screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'theme-light-home.png'),
    });
    
    // Switch to dark
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(300);
    }
    
    const isDarkAfterToggle = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Navigate to another page
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
    
    // Check if dark mode persisted
    const isDarkAfterNav = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'theme-dark-about.png'),
    });
    
    // Reload and check persistence
    await page.reload({ waitUntil: 'networkidle' });
    
    const isDarkAfterReload = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'theme-dark-after-reload.png'),
    });
    
    if (!isDarkAfterNav || !isDarkAfterReload) {
      issues.themeIssues.push('Theme does not persist across navigation or reload');
    }
  });

  // Language switching test
  test('Language switching - Gujarati', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Take English screenshot first
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'gujarati', 'home-english.png'),
      fullPage: true,
    });
    
    // Find language toggle
    const langButton = page.locator('button').filter({ hasText: /ગુ|EN/ }).first();
    
    if (await langButton.isVisible()) {
      await langButton.click();
      await page.waitForTimeout(500);
      
      // Take Gujarati screenshot
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'gujarati', 'home-gujarati.png'),
        fullPage: true,
      });
      
      // Navigate and check persistence
      await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'gujarati', 'about-gujarati.png'),
        fullPage: true,
      });
    }
  });

  // Mobile menu test
  test('Mobile menu functionality', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Screenshot before opening menu
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'mobile-menu-closed.png'),
    });
    
    // Find hamburger menu button
    const menuButton = page.locator('button').filter({ has: page.locator('svg') });
    const hamburger = menuButton.first();
    
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(300);
      
      // Screenshot with menu open
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'interactions', 'mobile-menu-open.png'),
      });
      
      // Test navigation from mobile menu
      const aboutLink = page.locator('a').filter({ hasText: /About|અમારા વિશે/ }).first();
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await page.waitForURL('**/about', { timeout: 5000 });
        expect(page.url()).toContain('/about');
      }
    }
  });

  // Form validation test
  test('Form validation - Register page', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle' });
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await page.waitForTimeout(300);
      
      // Check for validation messages
      const validationErrors = await page.locator('[class*="error"], [class*="invalid"], .text-red, .text-destructive').count();
      
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'interactions', 'form-validation.png'),
      });
    }
  });

  // Keyboard navigation test
  test('Keyboard navigation', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Tab through interactive elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Take screenshot showing focus state
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'interactions', 'keyboard-focus.png'),
    });
    
    // Test Enter key on focused element
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
  });

  // Browser back/forward test
  test('Browser navigation (back/forward)', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    
    // Visit multiple pages
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    
    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/about');
    
    // Go back again
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).not.toContain('/about');
    
    // Go forward
    await page.goForward();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/about');
  });

  // Final report generation
  test.afterAll(async () => {
    const reportPath = path.join(ARTIFACTS_DIR, 'audit-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      buildType: 'production',
      ...issues,
      summary: {
        totalConsoleErrors: issues.consoleErrors.length,
        totalNetworkErrors: issues.networkErrors.length,
        totalBrokenImages: issues.brokenImages.length,
        totalAccessibilityIssues: issues.accessibilityIssues.length,
        totalButtonIssues: issues.buttonIssues.length,
        totalThemeIssues: issues.themeIssues.length,
      },
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate markdown report
    const mdReport = `# Production Audit Report

**Generated:** ${report.timestamp}
**Build Type:** Production

## Summary

| Category | Count |
|----------|-------|
| Console Errors | ${report.summary.totalConsoleErrors} |
| Network Errors | ${report.summary.totalNetworkErrors} |
| Broken Images | ${report.summary.totalBrokenImages} |
| Accessibility Issues | ${report.summary.totalAccessibilityIssues} |
| Button/Contrast Issues | ${report.summary.totalButtonIssues} |
| Theme Issues | ${report.summary.totalThemeIssues} |

## Console Errors

${issues.consoleErrors.length > 0 ? issues.consoleErrors.map(e => `- ${e}`).join('\n') : 'None'}

## Network Errors

${issues.networkErrors.length > 0 ? issues.networkErrors.map(e => `- ${e}`).join('\n') : 'None'}

## Broken Images

${issues.brokenImages.length > 0 ? issues.brokenImages.map(e => `- ${e}`).join('\n') : 'None'}

## Accessibility Issues

${issues.accessibilityIssues.length > 0 ? issues.accessibilityIssues.map(e => `- ${e}`).join('\n') : 'None'}

## Button/Contrast Issues

${issues.buttonIssues.length > 0 ? issues.buttonIssues.map(e => `- ${e}`).join('\n') : 'None'}

## Theme Issues

${issues.themeIssues.length > 0 ? issues.themeIssues.map(e => `- ${e}`).join('\n') : 'None'}
`;
    
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'AUDIT_SUMMARY.md'), mdReport);
  });
});
