// @ts-check
import { test, expect } from "@playwright/test";

test(
  "Click on popular profile in navbar navigates to popular page",
  async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Popular' }).click();
    await expect(page).toHaveURL('/popular');
  }
);

test.fixme("Popular profiles listed", async ({ page }) => {
  // 1. navigate to popular profile page
  // 2. check the most popular profile is at the top of the profile list
});
