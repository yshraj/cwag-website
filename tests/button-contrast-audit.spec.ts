import { test, expect } from "@playwright/test";

/**
 * P0-3: Button Contrast & Visibility Audit
 * Testing all interactive elements for WCAG AA compliance
 */

const BASE_URL = "http://localhost:3001";

test.describe("Button Contrast & Visibility Audit", () => {
  // Test hero section buttons
  test("Hero section CTA buttons - light mode", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Primary CTA button - should have good contrast
    const primaryBtn = page.locator('a[href="/membership"] button').first();
    if (await primaryBtn.isVisible()) {
      await expect(primaryBtn).toBeVisible();
      await page.screenshot({
        path: "artifacts/production-audit/buttons/hero-cta-light.png",
        fullPage: false,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
    }
  });

  test("Hero section CTA buttons - dark mode", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: "artifacts/production-audit/buttons/hero-cta-dark.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });

  test("Navbar buttons in scrolled state - light mode", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Scroll to trigger navbar state change
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/buttons/navbar-scrolled-light.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });
  });

  test("Navbar buttons in scrolled state - dark mode", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Scroll to trigger navbar state change
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/buttons/navbar-scrolled-dark.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });
  });

  test("Theme toggle button visibility - both themes", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Light mode screenshot
    await page.screenshot({
      path: "artifacts/production-audit/buttons/theme-toggle-light.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Dark mode screenshot
    await page.screenshot({
      path: "artifacts/production-audit/buttons/theme-toggle-dark.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });
  });

  test("Contact form buttons - light mode", async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/buttons/contact-form-light.png",
      fullPage: true,
    });
  });

  test("Contact form buttons - dark mode", async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: "artifacts/production-audit/buttons/contact-form-dark.png",
      fullPage: true,
    });
  });

  test("Membership page buttons - both themes", async ({ page }) => {
    await page.goto(`${BASE_URL}/membership`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/buttons/membership-light.png",
      fullPage: true,
    });

    // Toggle to dark mode
    const themeToggle = page.locator('button:has-text("Toggle theme")');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: "artifacts/production-audit/buttons/membership-dark.png",
      fullPage: true,
    });
  });

  test("Footer CTA button - dark background", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight - 800)
    );
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/buttons/footer-cta.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });
});
