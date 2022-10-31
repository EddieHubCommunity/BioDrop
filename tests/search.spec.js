// @ts-check
import { test, expect } from "@playwright/test";

test("Search has title", async ({ page }) => {
  await page.goto("/search");
  await expect(page).toHaveTitle(/Search/);
});

test.fixme("Navigate to the Search page", async ({ page }) => {
  // 1. nagivate to homepage
  // 2. click on search on the navbar
  // 3. check for the text "search" on the page
});

test.fixme("Search page has no results when no search term used", async ({ page }) => {
  // 1. Navigate to search page
  // 2. Check no results are displayed
});

test.fixme("Search page shows no results after typing 2 characters", async ({ page }) => {
  // 1. Navigate to search page
  // 2. Type 2 characters
  // 3. Check no results are displayed
});

test.fixme("Search page shows results after typing 3 characters", async ({ page }) => {
  // 1. Navigate to search page
  // 2. Type 3 characters
  // 3. Check if the results show up if the it get matched.
});

test.fixme("After search click profile", async ({ page }) => {
  // 1. perform search
  // 2. click on searched profile
  // 3. check profile is displayed
});
