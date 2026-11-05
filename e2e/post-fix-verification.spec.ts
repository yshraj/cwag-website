import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const ARTIFACT_DIR = path.join(__dirname, "../artifacts/post-fix-1");

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

test.describe("Post-Fix Verification - Horizontal Overflow Check", () => {
  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    test(`homepage should not have horizontal overflow on ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Scroll through entire page
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const totalHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentScroll = 0;

        while (currentScroll < totalHeight) {
          window.scrollBy(0, viewportHeight / 2);
          currentScroll += viewportHeight / 2;
          await delay(150);
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(500);

      // Check for horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      // Capture screenshot
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `homepage-${viewportName}-full.png`),
        fullPage: true,
      });

      expect(hasHorizontalOverflow).toBe(false);
    });
  }
});

test.describe("Post-Fix Verification - Key Pages", () => {
  test("capture homepage desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "homepage-desktop-above-fold.png"),
      fullPage: false,
    });
  });

  test("capture homepage mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "homepage-mobile-above-fold.png"),
      fullPage: false,
    });
  });

  test("verify mobile menu backdrop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const menuButton = page.getByRole("button", { name: /toggle menu/i });
    await menuButton.click();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-menu-open.png"),
      fullPage: false,
    });
  });

  test("verify navbar on scroll", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "navbar-scrolled.png"),
      fullPage: false,
    });
  });

  test("verify footer styling", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "footer-desktop.png"),
      fullPage: false,
    });
  });
});
