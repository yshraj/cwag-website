import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3001';
const OUTPUT_DIR = path.join(__dirname, '../artifacts/production-audit/buttons');

const routes = ['/', '/about', '/membership', '/contact', '/news', '/events', '/register'];

test.beforeAll(() => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
});

interface ButtonIssue {
  page: string;
  theme: string;
  buttonText: string;
  issue: string;
  details: Record<string, unknown>;
}

const buttonIssues: ButtonIssue[] = [];

async function checkButtonContrast(
  page: any,
  pageName: string,
  theme: string
) {
  const buttons = await page.locator('button, a.inline-flex, [role="button"]').all();
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    try {
      if (!(await button.isVisible())) continue;
      
      const box = await button.boundingBox();
      if (!box || box.width < 10 || box.height < 10) continue;
      
      const styles = await button.evaluate((el: HTMLElement) => {
        const computed = window.getComputedStyle(el);
        const text = el.textContent?.trim() || '';
        
        // Parse RGB values
        const parseColor = (color: string) => {
          const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
          }
          return null;
        };
        
        const bgColor = parseColor(computed.backgroundColor);
        const textColor = parseColor(computed.color);
        
        // Calculate relative luminance
        const luminance = (rgb: { r: number; g: number; b: number } | null) => {
          if (!rgb) return 0;
          const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        
        const bgLum = luminance(bgColor);
        const textLum = luminance(textColor);
        const contrast = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
        
        return {
          text: text.slice(0, 50),
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          opacity: computed.opacity,
          visibility: computed.visibility,
          contrast: contrast.toFixed(2),
          isTransparentBg: computed.backgroundColor === 'rgba(0, 0, 0, 0)',
        };
      });
      
      // Check for potential issues
      if (parseFloat(styles.opacity) < 0.7) {
        buttonIssues.push({
          page: pageName,
          theme,
          buttonText: styles.text,
          issue: 'Low opacity',
          details: { opacity: styles.opacity }
        });
      }
      
      if (parseFloat(styles.contrast) < 3 && !styles.isTransparentBg) {
        buttonIssues.push({
          page: pageName,
          theme,
          buttonText: styles.text,
          issue: 'Poor contrast',
          details: { 
            contrast: styles.contrast,
            bg: styles.backgroundColor,
            text: styles.color
          }
        });
      }
      
    } catch (e) {
      // Button may have changed
    }
  }
}

test('Button audit - all pages light theme', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  for (const route of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    
    await checkButtonContrast(page, route, 'light');
    
    // Take screenshot of each page
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${route.replace('/', 'home') || 'home'}-light.png`),
      fullPage: true,
    });
  }
});

test('Button audit - all pages dark theme', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  for (const route of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);
    
    await checkButtonContrast(page, route, 'dark');
    
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${route.replace('/', 'home') || 'home'}-dark.png`),
      fullPage: true,
    });
  }
});

test('Button hover states', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Find primary CTA buttons
  const primaryButtons = await page.locator('button, a.inline-flex').all();
  
  for (let i = 0; i < Math.min(5, primaryButtons.length); i++) {
    const button = primaryButtons[i];
    if (await button.isVisible()) {
      // Get default state
      const defaultBg = await button.evaluate((el: HTMLElement) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Hover
      await button.hover();
      await page.waitForTimeout(200);
      
      const hoverBg = await button.evaluate((el: HTMLElement) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Check if hover state is different (indicates working hover)
      if (defaultBg === hoverBg) {
        const text = await button.textContent();
        buttonIssues.push({
          page: '/',
          theme: 'light',
          buttonText: text?.trim() || 'unknown',
          issue: 'No visible hover state change',
          details: { backgroundColor: defaultBg }
        });
      }
    }
  }
  
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'hover-state-test.png'),
  });
});

test('Button focus states (keyboard)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Tab through buttons
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
  }
  
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'focus-state-test.png'),
  });
});

test.afterAll(() => {
  // Write issues report
  const report = {
    timestamp: new Date().toISOString(),
    totalIssues: buttonIssues.length,
    issues: buttonIssues,
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'button-issues.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Also write markdown summary
  let md = `# Button Audit Report\n\n`;
  md += `**Generated:** ${report.timestamp}\n`;
  md += `**Total Issues:** ${report.totalIssues}\n\n`;
  
  if (buttonIssues.length > 0) {
    md += `## Issues Found\n\n`;
    for (const issue of buttonIssues) {
      md += `- **[${issue.theme}] ${issue.page}**: "${issue.buttonText}" - ${issue.issue}\n`;
      md += `  - Details: ${JSON.stringify(issue.details)}\n`;
    }
  } else {
    md += `✅ No button issues found!\n`;
  }
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'BUTTON_AUDIT.md'), md);
});
