// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("Click on events profile in navbar navigates to events page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Events" }).click();
  await expect(page).toHaveURL("/events");
});

test.fixme("Events listed", async ({ page }) => {
  await page.goto("/events");
  await expect(page.locator("li")).toBeGreaterThan(1);
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/events");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
