import { test, expect } from "@playwright/test";

/**
 * Final verification screenshots
 */

const BASE_URL = "http://localhost:3001";

test.describe("Final Verification", () => {
  test("Homepage hero with navbar - desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Wait for animations

    // Full viewport screenshot
    await page.screenshot({
      path: "artifacts/production-audit/final/desktop-hero-viewport.png",
      fullPage: false,
    });
  });

  test("Homepage hero with navbar - mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "artifacts/production-audit/final/mobile-hero-viewport.png",
      fullPage: false,
    });
  });

  test("Homepage full page - light mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "artifacts/production-audit/final/homepage-light-full.png",
      fullPage: true,
    });
  });

  test("Homepage full page - dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // Click theme toggle
    await page.click('button[class*="size-9"]');
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/final/homepage-dark-full.png",
      fullPage: true,
    });
  });

  test("Navbar scrolled state - light", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/final/navbar-scrolled-light.png",
      fullPage: false,
    });
  });

  test("About page - light mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/final/about-light.png",
      fullPage: true,
    });
  });

  test("Contact page - light mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/final/contact-light.png",
      fullPage: true,
    });
  });

  test("Gujarati language - homepage", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // Click language toggle (button with Globe icon)
    const langToggle = page.locator('button').filter({ hasText: /ગુ|EN/ }).first();
    if (await langToggle.isVisible()) {
      await langToggle.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: "artifacts/production-audit/final/homepage-gujarati.png",
      fullPage: true,
    });
  });
});
