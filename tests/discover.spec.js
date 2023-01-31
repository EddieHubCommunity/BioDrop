// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("Click on discover profile in navbar navigates to discover page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Discover" }).click();
  await expect(page).toHaveURL("/discover");
});

test.fixme("Random profiles listed", async ({ page }) => {
  // 1. navigate to discover profile page
  // 2. check random profiles are displayed
});

test.fixme("Discover profiles listed", async ({ page }) => {
  // 1. navigate to discover profile page
  // 2. check the most popular profile are listed
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/discover");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
