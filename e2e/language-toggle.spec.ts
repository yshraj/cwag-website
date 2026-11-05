import { test, expect } from "@playwright/test";

test.describe("Language Toggle", () => {
  test("should toggle between English and Gujarati", async ({ page }) => {
    await page.goto("/");

    // Find and click the language toggle button
    const languageButton = page.getByRole("button", { name: /ગુજરાતી|English/i });
    await expect(languageButton).toBeVisible();

    // Get initial text
    const initialText = await languageButton.textContent();

    // Click to toggle language
    await languageButton.click();

    // Verify the toggle switched
    const newText = await languageButton.textContent();
    expect(newText).not.toBe(initialText);
  });

  test("should persist language preference across navigation", async ({ page }) => {
    await page.goto("/");

    // Toggle to Gujarati
    const languageButton = page.getByRole("button", { name: /ગુજરાતી/i });
    await languageButton.click();

    // Navigate to another page
    await page.getByRole("link", { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*contact/);

    // Verify language is still Gujarati (button should show "English" option)
    await expect(page.getByRole("button", { name: /English/i })).toBeVisible();
  });
});
