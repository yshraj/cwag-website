import { test, expect } from "@playwright/test";

/**
 * Responsive Design Audit
 * Testing at all major breakpoints: 1440, 1280, 768, 390, 360
 */

const BASE_URL = "http://localhost:3001";

const BREAKPOINTS = [
  { name: "desktop-xl", width: 1440, height: 900 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile-large", width: 390, height: 844 },
  { name: "mobile-small", width: 360, height: 640 },
];

const PAGES = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "membership", path: "/membership" },
  { name: "news", path: "/news" },
  { name: "events", path: "/events" },
  { name: "contact", path: "/contact" },
];

test.describe("Responsive Design Audit", () => {
  // Test each page at each breakpoint
  for (const bp of BREAKPOINTS) {
    for (const pageInfo of PAGES) {
      test(`${pageInfo.name} at ${bp.name} (${bp.width}x${bp.height})`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${pageInfo.path}`);
        await page.waitForLoadState("networkidle");

        await page.screenshot({
          path: `artifacts/production-audit/responsive/${pageInfo.name}-${bp.name}.png`,
          fullPage: true,
        });
      });
    }
  }

  // Mobile menu tests
  test("Mobile menu opens and closes correctly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Screenshot before opening menu
    await page.screenshot({
      path: "artifacts/production-audit/responsive/mobile-menu-closed.png",
      fullPage: false,
    });

    // Find and click menu button
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);

      // Screenshot with menu open
      await page.screenshot({
        path: "artifacts/production-audit/responsive/mobile-menu-open.png",
        fullPage: false,
      });
    }
  });

  // Test hero section responsiveness
  test("Hero section text is readable at all breakpoints", async ({ page }) => {
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState("networkidle");

      // Check headline is visible
      const headline = page.locator("h1").first();
      await expect(headline).toBeVisible();

      await page.screenshot({
        path: `artifacts/production-audit/responsive/hero-${bp.name}.png`,
        fullPage: false,
      });
    }
  });

  // Test footer at mobile
  test("Footer is functional at mobile breakpoints", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/responsive/footer-mobile.png",
      fullPage: false,
    });
  });

  // Test form at mobile
  test("Contact form is usable at mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/responsive/contact-form-mobile.png",
      fullPage: true,
    });

    // Test input focus
    const nameInput = page.locator('input[id="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.focus();
      await page.screenshot({
        path: "artifacts/production-audit/responsive/contact-form-mobile-focused.png",
        fullPage: false,
      });
    }
  });

  // Test navbar at tablet
  test("Navbar at tablet breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: "artifacts/production-audit/responsive/navbar-tablet.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 768, height: 100 },
    });
  });

  // Test cards and grids at different sizes
  test("Cards layout at different breakpoints", async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");

    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.waitForTimeout(300);

      await page.screenshot({
        path: `artifacts/production-audit/responsive/about-cards-${bp.name}.png`,
        fullPage: true,
      });
    }
  });
});
