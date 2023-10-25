import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { login, logout } from "../../setup/auth";

const premiumUser = {
  name: "Automated Test Premium User",
  email: "test-profile-user-6@test.com",
  username: "_test-profile-user-6",
  type: "premium",
};

test("Guest user cannot access premium locations stats", async ({
  browser,
}) => {
  const context = await logout(browser);
  const page = await context.newPage();
  await page.goto("/account/statistics/locations");
  await expect(page).toHaveURL("/auth/signin");
});

test("Logged in free user cannot access premium locations stats", async ({
  browser,
}) => {
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/account/statistics/locations");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/account\/onboarding/);
});

test("Logged in premium user can access premium locations stats", async ({
  browser,
}) => {
  const context = await login(browser, premiumUser);
  const page = await context.newPage();
  await page.goto("/account/statistics/locations");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/account/statistics/locations");
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ browser }) => {
    const context = await login(browser);
    const page = await context.newPage();
    await page.goto("/account/statistics/locations");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({
    browser,
  }) => {
    const context = await login(browser);
    const page = await context.newPage();
    await page.goto("/account/statistics/locations");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
