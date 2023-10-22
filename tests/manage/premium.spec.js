import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { login, logout } from "../setup/auth";

const premiumUser = {
  name: "Automated Test Premium User",
  email: "test-premium-user@test.com",
  username: "_test-premium-user",
  type: "premium",
};

test("Guest user cannot access manage premium", async ({ browser }) => {
  const context = await logout(browser);
  const page = await context.newPage();
  await page.goto("/account/manage/premium");
  await expect(page).toHaveURL(/auth\/signin/);
});

test("Logged in user can access manage premium but has alert", async ({
  browser,
}) => {
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/account/manage/premium");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("div.alert-warning")).toHaveText(
    /Please upgrade your account for these to take effect/,
  );
  await expect(page).toHaveURL(/account\/manage\/premium/);
});

test("Logged in user can access manage premium but has no alert", async ({
  browser,
}) => {
  const context = await login(browser, premiumUser);
  const page = await context.newPage();
  await page.goto("/account/manage/premium");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("div.alert-warning")).toBeHidden();
  await expect(page).toHaveURL(/account\/manage\/premium/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ browser }) => {
    const context = await login(browser);
    const page = await context.newPage();
    await page.goto("/account/manage/premium");
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
    await page.goto("/account/manage/premium");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
