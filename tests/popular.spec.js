// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require('@axe-core/playwright').default;

test.fixme(
  "Click on popular profile in navbar navigates to popular page",
  async ({ page }) => {
    // 1. click on popular nav link
    // 2. check if it takes us to the popular page
  }
);

test.fixme("Popular profiles listed", async ({ page }) => {
  // 1. navigate to popular profile page
  // 2. check the most popular profile is at the top of the profile list
});

test('should pass axe wcag accessibility tests', async ({ page }) => {
  await page.goto('/popular');
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
