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

test.fixme("After search click profile", async ({ page }) => {
  // 1. perform search
  // 2. click on searched profile
  // 3. check profile is displayed
});
