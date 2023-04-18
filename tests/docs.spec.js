// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("docs page has title", async ({ page }) => {
  await page.goto("/docs");
  await expect(page).toHaveTitle(/Documentation/);
});

test("events page has at least 1 event", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.locator("h2")).toHaveText("Getting started");
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/docs");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
