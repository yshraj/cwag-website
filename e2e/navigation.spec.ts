import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to About page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /about/i }).first().click();
    await expect(page).toHaveURL(/.*about/);
  });

  test("should navigate to Directory page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /directory/i }).click();
    await expect(page).toHaveURL(/.*directory/);
  });

  test("should navigate to Membership page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /membership/i }).click();
    await expect(page).toHaveURL(/.*membership/);
  });

  test("should navigate to Events page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /events/i }).click();
    await expect(page).toHaveURL(/.*events/);
  });

  test("should navigate to Contact page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*contact/);
  });

  test("should navigate to Register page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /register/i }).first().click();
    await expect(page).toHaveURL(/.*register/);
  });

  test("logo should link to homepage", async ({ page }) => {
    await page.goto("/about");
    await page.getByAltText(/Coaches Welfare Association Gujarat/i).click();
    await expect(page).toHaveURL("/");
  });
});
