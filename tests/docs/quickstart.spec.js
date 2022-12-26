// @ts-check
import { test, expect } from "@playwright/test";

test("quickstart has title", async ({ page }) => {
  await page.goto("/docs/quickstart");
  await expect(page).toHaveTitle(/QuickStart/);
});
