// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/LinkFree/);
});

test("homepage has example link", async ({ page }) => {
  await page.goto("/");
  const getStarted = page.getByText("Example");
  await getStarted.click();
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/eddiejaoude/);
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();

  await expect(page).toHaveURL(/github/);
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
