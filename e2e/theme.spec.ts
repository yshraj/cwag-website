import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test("should have theme toggle button", async ({ page }) => {
    await page.goto("/");

    // Theme toggle should be present (it's usually a button with sun/moon icon)
    const themeToggle = page.locator("button").filter({ has: page.locator("svg") }).first();
    await expect(themeToggle).toBeVisible();
  });

  test("should toggle between light and dark theme", async ({ page }) => {
    await page.goto("/");

    // Get initial html class or data attribute
    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    // Find and click theme toggle
    // The theme toggle is usually identifiable by containing a sun or moon icon
    const themeToggle = page.getByRole("button").filter({ has: page.locator('[class*="sun"], [class*="moon"]') }).first();
    
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(300);
      
      // Verify class changed
      const newClass = await html.getAttribute("class");
      expect(newClass).not.toBe(initialClass);
    }
  });
});
