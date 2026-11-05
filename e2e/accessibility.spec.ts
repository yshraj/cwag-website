import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // There should be at least one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/");

    // Get all images
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // Alt should exist and not be empty
      expect(alt).toBeTruthy();
    }
  });

  test("links should have accessible names", async ({ page }) => {
    await page.goto("/");

    // Check navigation links have accessible text
    const navLinks = page.getByRole("link");
    const linkCount = await navLinks.count();

    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = navLinks.nth(i);
      const name = await link.getAttribute("aria-label") || await link.textContent();
      expect(name?.trim()).toBeTruthy();
    }
  });

  test("buttons should have accessible names", async ({ page }) => {
    await page.goto("/");

    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const text = await button.textContent();
      const srOnly = await button.locator(".sr-only").textContent().catch(() => null);
      
      // Button should have some accessible name
      const hasAccessibleName = ariaLabel || text?.trim() || srOnly;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test("page should have a main landmark", async ({ page }) => {
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
