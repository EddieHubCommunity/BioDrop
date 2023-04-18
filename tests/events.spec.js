// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("events page has title", async ({ page }) => {
  await page.goto("/events");
  await expect(page).toHaveTitle(/Events/);
});

test("events page has at least 1 event", async ({ page }) => {
  await page.goto("/events");

  await expect(page.locator("ul > li")).not.toEqual(0);
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/events");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
