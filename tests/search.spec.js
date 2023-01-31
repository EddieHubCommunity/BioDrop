// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

test("Search has title", async ({ page }) => {
  await page.goto("/search");
  await expect(page).toHaveTitle(/Search/);
});

test("Navigate to the Search page", async ({ page }) => {
  await page.goto("/");
  await page.locator("a:visible", { hasText: "Search" }).click();
  await expect(page.locator("h1")).toHaveText("Search");
});

test("Search works correctly", async ({ page }) => {
  // 1. navigate to search page
  await page.goto("/search");

  // 2. show no users are listed
  await expect(page.locator("li")).toHaveCount(0);

  // 3. type in search and check that user with the name exist and check a name doesn't exist
  const input = page.locator("[name='keyword']");
  await input.type("_test-profile-user-1");

  await expect(page.locator("li")).toHaveCount(1);
});

test("Search page has no results when no search term used", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("");

  await expect(page.locator("li")).toHaveCount(0);
});

test("Search page shows no results after typing 2 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("ed");

  await expect(page.locator("li")).toHaveCount(0);
});

test("Search page shows results after typing 3 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("aka");

  await expect(page.locator("li")).toContainText(["aka"]);
});

test.fixme("After search click profile", async ({ page }) => {
  // 1. perform search
  // 2. click on searched profile
  // 3. check profile is displayed
});

test.fixme(
  "find the profile after providing concise name",
  async ({ page }) => {
    // 1. click on search profile
    // 2. type the whole name
    // 3. Display the profile if the name is correct
  }
);

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/search");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
