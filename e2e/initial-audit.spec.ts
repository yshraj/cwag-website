import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const ARTIFACT_DIR = path.join(__dirname, "../artifacts/initial-audit");

// Ensure artifact directory exists
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const PAGES = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "directory", path: "/directory" },
  { name: "membership", path: "/membership" },
  { name: "events", path: "/events" },
  { name: "news", path: "/news" },
  { name: "contact", path: "/contact" },
  { name: "register", path: "/register" },
];

async function captureFullPage(page: Page, name: string, viewport: string) {
  const filename = `${name}-${viewport}-full.png`;
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, filename),
    fullPage: true,
  });
  console.log(`Captured: ${filename}`);
}

async function captureAboveFold(page: Page, name: string, viewport: string) {
  const filename = `${name}-${viewport}-above-fold.png`;
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, filename),
    fullPage: false,
  });
  console.log(`Captured: ${filename}`);
}

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function checkForNetworkErrors(page: Page): Promise<string[]> {
  const failures: string[] = [];
  page.on("requestfailed", (request) => {
    failures.push(`${request.url()} - ${request.failure()?.errorText}`);
  });
  return failures;
}

test.describe("Initial Website Audit - Desktop (1440px)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
  });

  for (const pageInfo of PAGES) {
    test(`capture ${pageInfo.name} page`, async ({ page }) => {
      const consoleErrors = await collectConsoleErrors(page);
      const networkErrors = await checkForNetworkErrors(page);

      await page.goto(pageInfo.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000); // Wait for animations

      // Capture above fold
      await captureAboveFold(page, pageInfo.name, "desktop");

      // Scroll through entire page to trigger lazy loading
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const totalHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentScroll = 0;

        while (currentScroll < totalHeight) {
          window.scrollBy(0, viewportHeight / 2);
          currentScroll += viewportHeight / 2;
          await delay(200);
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(500);

      // Capture full page
      await captureFullPage(page, pageInfo.name, "desktop");

      // Log errors for analysis
      if (consoleErrors.length > 0) {
        console.log(`Console errors on ${pageInfo.name}:`, consoleErrors);
      }
      if (networkErrors.length > 0) {
        console.log(`Network errors on ${pageInfo.name}:`, networkErrors);
      }
    });
  }
});

test.describe("Initial Website Audit - Tablet (768px)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
  });

  for (const pageInfo of PAGES) {
    test(`capture ${pageInfo.name} page`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      await captureAboveFold(page, pageInfo.name, "tablet");

      // Scroll through page
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const totalHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentScroll = 0;

        while (currentScroll < totalHeight) {
          window.scrollBy(0, viewportHeight / 2);
          currentScroll += viewportHeight / 2;
          await delay(200);
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(500);
      await captureFullPage(page, pageInfo.name, "tablet");
    });
  }
});

test.describe("Initial Website Audit - Mobile (390px)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
  });

  for (const pageInfo of PAGES) {
    test(`capture ${pageInfo.name} page`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      await captureAboveFold(page, pageInfo.name, "mobile");

      // Scroll through page
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const totalHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentScroll = 0;

        while (currentScroll < totalHeight) {
          window.scrollBy(0, viewportHeight / 2);
          currentScroll += viewportHeight / 2;
          await delay(200);
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(500);
      await captureFullPage(page, pageInfo.name, "mobile");
    });
  }
});

test.describe("Theme Toggle Test", () => {
  test("capture light and dark theme", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Capture initial theme
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "theme-initial.png"),
      fullPage: false,
    });

    // Find and click theme toggle
    const themeButtons = page.locator("button");
    const count = await themeButtons.count();

    for (let i = 0; i < count; i++) {
      const button = themeButtons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const text = await button.textContent();

      if (
        ariaLabel?.toLowerCase().includes("theme") ||
        text?.toLowerCase().includes("theme")
      ) {
        await button.click();
        break;
      }
    }

    await page.waitForTimeout(500);

    // Capture toggled theme
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "theme-toggled.png"),
      fullPage: false,
    });
  });
});

test.describe("Language Toggle Test", () => {
  test("capture English and Gujarati", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Capture English version
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "language-english.png"),
      fullPage: false,
    });

    // Find and click language toggle
    const languageButton = page.getByRole("button", { name: /ગુજરાતી|English/i });
    if (await languageButton.isVisible()) {
      await languageButton.click();
      await page.waitForTimeout(500);

      // Capture Gujarati version
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "language-gujarati.png"),
        fullPage: false,
      });
    }
  });
});

test.describe("Navigation Interactions", () => {
  test("test mobile hamburger menu", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Capture before opening menu
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-menu-closed.png"),
      fullPage: false,
    });

    // Find and click hamburger menu
    const menuButton = page.getByRole("button", { name: /toggle menu|menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Capture open menu
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "mobile-menu-open.png"),
        fullPage: false,
      });
    }
  });

  test("test hover states on desktop navigation", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Hover over nav items
    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    if (await aboutLink.isVisible()) {
      await aboutLink.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "nav-hover-state.png"),
        fullPage: false,
      });
    }
  });
});

test.describe("Console and Network Errors Check", () => {
  test("collect all errors across pages", async ({ page }) => {
    const allErrors: Record<string, { console: string[]; network: string[] }> = {};

    for (const pageInfo of PAGES) {
      const consoleErrors: string[] = [];
      const networkErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
      page.on("pageerror", (error) => {
        consoleErrors.push(error.message);
      });
      page.on("requestfailed", (request) => {
        networkErrors.push(`${request.url()} - ${request.failure()?.errorText}`);
      });

      await page.goto(pageInfo.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      allErrors[pageInfo.name] = { console: consoleErrors, network: networkErrors };
    }

    // Write errors to file
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "errors-report.json"),
      JSON.stringify(allErrors, null, 2)
    );

    console.log("Errors report saved to errors-report.json");
  });
});

test.describe("Horizontal Scroll Check", () => {
  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    test(`check horizontal overflow on ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);

      const overflowPages: string[] = [];

      for (const pageInfo of PAGES) {
        await page.goto(pageInfo.path, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        if (hasHorizontalOverflow) {
          overflowPages.push(pageInfo.name);
          await page.screenshot({
            path: path.join(ARTIFACT_DIR, `overflow-${pageInfo.name}-${viewportName}.png`),
            fullPage: true,
          });
        }
      }

      if (overflowPages.length > 0) {
        console.log(`Horizontal overflow detected on ${viewportName}:`, overflowPages);
      }
    });
  }
});
