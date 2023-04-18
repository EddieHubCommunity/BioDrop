import { test, expect } from "@playwright/test";
import { login, logout } from "./setup/auth";

test("Guest user cannot access dashboard", async ({ page }) => {
  // fixture: make sure user is logged out
  await logout();
  await page.goto("/account/statistics");
  await expect(page).toHaveURL(/\//);
});

test("Logged in user can access dashboard", async ({ page }) => {
  // fixture: make sure user is logged in
  await login();
  await page.goto("/account/statistics");
  await expect(page).toHaveURL(/account\/statistics/);
});
