// @ts-check
import { test, expect } from "@playwright/test";

test("quickstart json has title", async ({ page }) => {
  await page.goto("/docs/quickstart-json");
  await expect(page).toHaveTitle(/QuickStart/);
});

test("quickstart form has title", async ({ page }) => {
  await page.goto("/docs/quickstart-forms");
  await expect(page).toHaveTitle(/QuickStart/);
});
