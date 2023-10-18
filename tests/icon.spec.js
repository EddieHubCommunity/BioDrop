// @ts-check
import { test, expect } from "@playwright/test";

const defaultIcons = 20;

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
  await input.type("mobile");
  const results = await page.locator("main ul li").count();

  await expect(results).toBeGreaterThanOrEqual(7);
});

test("Icon search page has default results when no search term used", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.type("");

  await expect(page.locator("main ul li")).toHaveCount(defaultIcons);
});

test("Icon search page shows default results after typing 1 characters", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.type("e");

  await expect(page.locator("main ul li")).toHaveCount(defaultIcons);
});

test("Icon search page shows results after typing 3 characters", async ({
  page,
}) => {
  await page.goto("/icons");

  const input = page.locator("[name='keyword']");
  await input.type("hand");
  const results = await page.locator("main ul li").count();

  await expect(page.locator("main ul li")).toContainText(["hand"]);
  await expect(results).toBeGreaterThanOrEqual(defaultIcons);
});
