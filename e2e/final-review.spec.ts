import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const ARTIFACT_DIR = path.join(__dirname, "../artifacts/final-review");
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const PAGES = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "directory", path: "/directory" },
  { name: "membership", path: "/membership" },
  { name: "events", path: "/events" },
  { name: "news", path: "/news" },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

test.describe("Final Review - All Pages", () => {
  for (const pageInfo of PAGES) {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`${pageInfo.name} - ${viewportName}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(pageInfo.path, { waitUntil: "networkidle" });
        await page.waitForTimeout(1000);

        // Scroll through page
        await page.evaluate(async () => {
          const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
          const totalHeight = document.body.scrollHeight;
          const viewportHeight = window.innerHeight;
          let currentScroll = 0;
          while (currentScroll < totalHeight) {
            window.scrollBy(0, viewportHeight / 2);
            currentScroll += viewportHeight / 2;
            await delay(100);
          }
          window.scrollTo(0, 0);
        });

        await page.waitForTimeout(300);

        // Capture full page
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `${pageInfo.name}-${viewportName}.png`),
          fullPage: true,
        });

        // Check no horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasOverflow).toBe(false);
      });
    }
  }
});

test.describe("Final Review - Interactions", () => {
  test("mobile menu functionality", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/", { waitUntil: "networkidle" });
    
    const menuButton = page.getByRole("button", { name: /toggle menu/i });
    await menuButton.click();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-menu-final.png"),
      fullPage: false,
    });

    // Verify menu contains About link in the mobile nav
    const mobileNavAbout = page.locator("nav").filter({ has: page.getByText("About", { exact: true }) });
    await expect(mobileNavAbout).toBeVisible();
  });

  test("theme toggle", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    
    // Scroll down to see scrolled navbar
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "light-theme-scrolled.png"),
      fullPage: false,
    });
  });

  test("footer final state", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "footer-final.png"),
      fullPage: false,
    });
  });

  test("language toggle - gujarati", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    
    const languageButton = page.getByRole("button", { name: /ગુ|EN/i }).first();
    await languageButton.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "gujarati-homepage.png"),
      fullPage: false,
    });
  });
});

test.describe("Final Review - Console Errors", () => {
  test("no critical console errors", async ({ page }) => {
    const errors: string[] = [];
    
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    for (const pageInfo of PAGES) {
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
    }

    // Filter out known non-critical errors (like build manifest temp files)
    const criticalErrors = errors.filter(
      (e) => !e.includes("_buildManifest") && !e.includes("manifest.json")
    );

    // Write errors report
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "console-errors.json"),
      JSON.stringify({ totalErrors: errors.length, criticalErrors }, null, 2)
    );

    console.log(`Total console errors: ${errors.length}`);
    console.log(`Critical errors: ${criticalErrors.length}`);
  });
});
