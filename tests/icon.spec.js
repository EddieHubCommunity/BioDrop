// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const defaultIcons = 22;

test("Icon search has title", async ({ page }) => {
  await page.goto("/icons");
  await expect(page).toHaveTitle(/Icons/);
});

test("Icon search works correctly", async ({ page }) => {
  // 1. navigate to search page
  await page.goto("/icons");

  // 2. show no icons are listed
  await expect(page.locator("main li")).toHaveCount(defaultIcons);

  // 3. type in search and check that icons with the name exist and check a name doesn't exist
  const input = page.locator("[name='keyword']");
  await input.fill("mobile");
  const results = await page.locator("main ul li").count();

  await expect(results).toBeGreaterThanOrEqual(7);
});

test("Icon search page has default results when no search term used", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.fill("");

  await expect(page.locator("main ul li")).toHaveCount(defaultIcons);
});

test("Icon search page shows default results after typing 1 characters", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.fill("e");

  await expect(page.locator("main ul li")).toHaveCount(defaultIcons);
});

test("Icon search page shows results after typing 3 characters", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.fill("hand");
  await page.locator("form button").click();

  await expect(page).toHaveURL("/icons?keyword=hand");
  const results = await page.locator("main ul li").count();

  await expect(page.locator("main ul li")).toContainText(["hand"]);
  expect(results).toBeGreaterThanOrEqual(defaultIcons);
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (_test-profile-user-6) (dark)", async ({
    page,
  }) => {
    await page.goto("/_test-profile-user-6");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should pass axe wcag accessibility tests (_test-wcag-user) (dark)", async ({
    page,
  }) => {
    await page.goto("/_test-wcag-user");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
