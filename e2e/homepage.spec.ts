import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/CWAG|Coaches Welfare/i);
  });

  test("should display the logo", async ({ page }) => {
    const logo = page.getByAltText(/Coaches Welfare Association Gujarat/i);
    await expect(logo).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    // Check main navigation items exist
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /directory/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /membership/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /events/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  });

  test("should have a register button", async ({ page }) => {
    const registerButton = page.getByRole("link", { name: /register/i });
    await expect(registerButton).toBeVisible();
  });
});
