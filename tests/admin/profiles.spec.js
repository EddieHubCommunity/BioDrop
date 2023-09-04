import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { login, logout } from "../setup/auth";

const adminUser = {
  name: "Automated Test Admin User",
  email: "test-admin-user@test.com",
  username: "_test-admin-user",
  type: "free",
};

test("Guest user cannot access admin profiles", async ({ browser }) => {
  const context = await logout(browser);
  const page = await context.newPage();
  await page.goto("/admin/profiles");
  await expect(page).toHaveURL(/auth\/signin/);
});

test("Logged in user cannot access admin profiles", async ({ browser }) => {
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/admin/profiles");
  await expect(page).toHaveURL(/404/);
});

test("Admin user can access profiles", async ({ browser }) => {
  const context = await login(browser, adminUser);
  const page = await context.newPage();
  await page.goto("/admin/profiles");
  await expect(page).toHaveURL(/admin\/profiles/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ browser }) => {
    const context = await login(browser, adminUser);
    const page = await context.newPage();
    await page.goto("/admin/profiles");
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
    const context = await login(browser, adminUser);
    const page = await context.newPage();
    await page.goto("/admin/profiles");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
