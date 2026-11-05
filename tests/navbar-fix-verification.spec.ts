import { test, expect } from "@playwright/test";

/**
 * Verification test for navbar theme toggle fix
 */

const BASE_URL = "http://localhost:3001";

test.describe("Navbar Theme Toggle Fix Verification", () => {
  test("Desktop - theme toggle blends with hero (not scrolled)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/verification/navbar-desktop-hero.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 200 },
    });
  });

  test("Desktop - theme toggle after scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/verification/navbar-desktop-scrolled.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });
  });

  test("Mobile - theme toggle on hero background", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/verification/navbar-mobile-hero.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 390, height: 150 },
    });
  });

  test("Mobile - theme toggle after scroll", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/verification/navbar-mobile-scrolled.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 390, height: 100 },
    });
  });

  test("Full homepage light mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/verification/homepage-light-full.png",
      fullPage: true,
    });
  });

  test("Full homepage dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to dark
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: "artifacts/production-audit/verification/homepage-dark-full.png",
      fullPage: true,
    });
  });
});
