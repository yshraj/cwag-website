import { test } from "@playwright/test";

test.use({
  // Don't use webServer for this test
  baseURL: "http://localhost:3001",
});

test("Quick hero screenshot", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1500);
  
  await page.screenshot({
    path: "artifacts/production-audit/final/quick-hero.png",
    fullPage: false,
  });
});
