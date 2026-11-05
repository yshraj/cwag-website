import { test, expect } from "@playwright/test";

/**
 * P1-1: Dark Mode Consistency Audit
 * Testing theme toggle and persistence across pages
 */

const BASE_URL = "http://localhost:3001";
const PAGES = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "membership", path: "/membership" },
  { name: "news", path: "/news" },
  { name: "events", path: "/events" },
  { name: "contact", path: "/contact" },
];

test.describe("Theme Consistency Audit", () => {
  test("Hero section maintains dark background in both themes", async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Light mode - hero should still be dark
    await page.screenshot({
      path: "artifacts/production-audit/theme/hero-light-mode.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Dark mode - hero should remain consistent
    await page.screenshot({
      path: "artifacts/production-audit/theme/hero-dark-mode.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });

  // Test each page in both themes
  for (const pageInfo of PAGES) {
    test(`${pageInfo.name} page - light mode full`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.path}`);
      await page.waitForLoadState("networkidle");

      await page.screenshot({
        path: `artifacts/production-audit/theme/${pageInfo.name}-light-full.png`,
        fullPage: true,
      });
    });

    test(`${pageInfo.name} page - dark mode full`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.path}`);
      await page.waitForLoadState("networkidle");

      // Toggle to dark mode
      const themeToggle = page.locator('button:has-text("Toggle theme")');
      if (await themeToggle.isVisible()) {
        await themeToggle.click();
        await page.waitForTimeout(500);
      }

      await page.screenshot({
        path: `artifacts/production-audit/theme/${pageInfo.name}-dark-full.png`,
        fullPage: true,
      });
    });
  }

  test("Theme persists across navigation", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Check dark mode is applied
    const body = page.locator("body");
    // Navigate to another page
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");

    // Verify dark mode persists
    await page.screenshot({
      path: "artifacts/production-audit/theme/dark-persists-about.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // Navigate to contact
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/theme/dark-persists-contact.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });

  test("Cards and sections use proper theme colors", async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");

    // Light mode
    await page.screenshot({
      path: "artifacts/production-audit/theme/about-cards-light.png",
      fullPage: true,
    });

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Dark mode
    await page.screenshot({
      path: "artifacts/production-audit/theme/about-cards-dark.png",
      fullPage: true,
    });
  });
});
