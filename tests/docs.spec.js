// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require('@axe-core/playwright').default;

test('should pass axe wcag accessibility tests', async ({ page }) => {
  await page.goto('/docs');
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
