import { test } from "@playwright/test";

/**
 * CWAG Website - Post-fix screenshot capture
 * Captures screenshots after Phase 1 fixes to verify changes
 */

const routes = [
  { path: "/", name: "homepage" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/membership", name: "membership" },
  { path: "/news", name: "news" },
  { path: "/events", name: "events" },
];

test.describe("Post-Fix Screenshots", () => {
  // Desktop captures
  for (const route of routes) {
    test(`${route.name} - desktop`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `artifacts/production-audit/after/desktop/${route.name}.png`,
        fullPage: true,
      });
    });
  }

  // Mobile captures
  for (const route of routes) {
    test(`${route.name} - mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `artifacts/production-audit/after/mobile/${route.name}.png`,
        fullPage: true,
      });
    });
  }

  // Dark mode captures
  test("homepage - dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    
    // Toggle dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
    
    await page.screenshot({
      path: "artifacts/production-audit/after/desktop/homepage-dark.png",
      fullPage: true,
    });
  });
});
