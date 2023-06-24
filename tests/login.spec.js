import { test, expect } from "@playwright/test";
import { login, logout } from "./setup/auth";

test("Guest user cannot access dashboard", async ({ browser }) => {
  // fixture: make sure user is logged out
  const context = await logout(browser);
  const page = await context.newPage();
  await page.goto("/account/statistics");
  await expect(page).toHaveURL(/\//);
});

test("Logged in user can access dashboard", async ({ browser }) => {
  // fixture: make sure user is logged in
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/account/statistics");
  await expect(page).toHaveURL(/account\/statistics/);
});
