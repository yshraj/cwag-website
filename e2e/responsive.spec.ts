import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("desktop navigation should be visible on large screens", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Desktop nav should be visible
    const desktopNav = page.locator("nav").filter({ has: page.getByRole("link", { name: /about/i }) });
    await expect(desktopNav).toBeVisible();
  });

  test("mobile menu button should be visible on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu button should be visible
    const menuButton = page.getByRole("button", { name: /toggle menu|menu/i });
    await expect(menuButton).toBeVisible();
  });

  test("mobile menu should open and close", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Click hamburger menu
    const menuButton = page.getByRole("button", { name: /toggle menu|menu/i });
    await menuButton.click();

    // Mobile nav links should become visible
    await expect(page.getByRole("link", { name: /directory/i })).toBeVisible();

    // Click menu button again to close
    await menuButton.click();

    // Give time for animation
    await page.waitForTimeout(500);
  });
});
