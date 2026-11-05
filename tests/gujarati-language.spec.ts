import { test, expect } from "@playwright/test";

/**
 * Bilingual (Gujarati) Language Rendering Test
 * Testing language toggle and Gujarati text rendering
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

test.describe("Gujarati Language Rendering", () => {
  test("Language toggle functionality", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Find language toggle button
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });

    await expect(langToggle).toBeVisible();

    // Screenshot in English
    await page.screenshot({
      path: "artifacts/production-audit/language/homepage-english.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // Toggle to Gujarati
    await langToggle.click();
    await page.waitForTimeout(500);

    // Screenshot in Gujarati
    await page.screenshot({
      path: "artifacts/production-audit/language/homepage-gujarati.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });

  // Test each page in Gujarati
  for (const pageInfo of PAGES) {
    test(`${pageInfo.name} page - Gujarati full page`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.path}`);
      await page.waitForLoadState("networkidle");

      // Toggle to Gujarati
      const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
      if (await langToggle.isVisible()) {
        await langToggle.click();
        await page.waitForTimeout(500);
      }

      await page.screenshot({
        path: `artifacts/production-audit/language/${pageInfo.name}-gujarati.png`,
        fullPage: true,
      });
    });
  }

  test("Gujarati text renders correctly in hero section", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to Gujarati
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
    await langToggle.click();
    await page.waitForTimeout(500);

    // Check headline exists and is in Gujarati
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();

    const headlineText = await headline.textContent();
    // Gujarati text should contain Gujarati characters
    expect(headlineText).toMatch(/[\u0A80-\u0AFF]/); // Gujarati Unicode range
  });

  test("Gujarati text in navigation items", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to Gujarati
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
    await langToggle.click();
    await page.waitForTimeout(500);

    // Screenshot focused on navbar
    await page.screenshot({
      path: "artifacts/production-audit/language/navbar-gujarati.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });

    // Verify at least one nav item has Gujarati text
    const navItems = page.locator("nav a, nav button");
    const count = await navItems.count();
    let hasGujarati = false;

    for (let i = 0; i < count; i++) {
      const text = await navItems.nth(i).textContent();
      if (text && /[\u0A80-\u0AFF]/.test(text)) {
        hasGujarati = true;
        break;
      }
    }

    expect(hasGujarati).toBe(true);
  });

  test("Gujarati text in footer", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to Gujarati
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
    await langToggle.click();
    await page.waitForTimeout(500);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/language/footer-gujarati.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 600 },
    });
  });

  test("Form labels in Gujarati", async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState("networkidle");

    // Toggle to Gujarati
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
    await langToggle.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "artifacts/production-audit/language/contact-form-gujarati.png",
      fullPage: true,
    });
  });

  test("Language persists across navigation", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    // Toggle to Gujarati
    const langToggle = page.locator("button").filter({ hasText: /ગુ|EN/ });
    await langToggle.click();
    await page.waitForTimeout(500);

    // Navigate to about page
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");

    // Check if page is still in Gujarati
    const headline = page.locator("h1").first();
    const headlineText = await headline.textContent();
    expect(headlineText).toMatch(/[\u0A80-\u0AFF]/);

    await page.screenshot({
      path: "artifacts/production-audit/language/gujarati-persists-about.png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 600 },
    });
  });
});
