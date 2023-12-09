// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("docs page has title", async ({ page }) => {
  await page.goto("/docs");
  await expect(page).toHaveTitle(/Documentation/);
});

test("docs has quickstart link", async ({ page }) => {
  await page.goto("/docs");
  const getStarted = page.locator('h3:has-text("Quickstart")');

  await getStarted.click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/quickstart/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ page }) => {
    await page.goto("/docs");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/docs");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
