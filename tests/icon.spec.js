// @ts-check
import { test, expect } from "@playwright/test";

test("Icon search has title", async ({ page }) => {
  await page.goto("/icons");
  await expect(page).toHaveTitle(/Icons/);
});

test("Icon search works correctly", async ({ page }) => {
  // 1. navigate to search page
  await page.goto("/icons");

  // 2. show no users are listed
  await expect(page.locator("li")).toHaveCount(0);

  // 3. type in search and check that user with the name exist and check a name doesn't exist
  const input = page.locator("[name='keyword']");
  await input.type("mobile");

  await expect(page.locator("li")).toHaveCount(4);
});

test("Icon search page has no results when no search term used", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("");

  await expect(page.locator("li")).toHaveCount(0);
});

test("Icon search page shows no results after typing 2 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("ed");

  await expect(page.locator("li")).toHaveCount(0);
});

test("Icon search page shows results after typing 3 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("hand");

  await expect(page.locator("li")).toContainText(["hand"]);
});
