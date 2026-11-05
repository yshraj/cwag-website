import { test } from "@playwright/test";

test("Theme toggle screenshot with cache bypass", async ({ page }) => {
  // Bypass cache
  await page.route("**/*", (route) => {
    route.continue({
      headers: {
        ...route.request().headers(),
        "Cache-Control": "no-cache",
      },
    });
  });

  await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: "artifacts/production-audit/final/theme-toggle-test.png",
    fullPage: false,
  });
});
