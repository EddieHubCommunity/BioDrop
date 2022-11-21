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

test.fixme("Search works correctly", async ({ page }) => {
  // 1. nagivate to search page
  // 2. show user is listed with all users (no search term)
  // 3. type in search and check that user with the name exist and check a name doesn't exist from step 2
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

test.fixme("find the profile after providing concise name", async ({ page }) => {
  // 1. click on search profile
  // 2. type the whole name
  // 3. Display the profile if the name is correct
});
