// @ts-check
const { test, expect } = require("@playwright/test");

test("Profile has title", async ({ page }) => {
  await page.goto("/eddiejaoude");
  await expect(page).toHaveTitle(/Eddie Jaoude/);
});

test.fixme("Name appears on the page", async ({ page }) => {
  // 1. nagivate to profile page
  // 2. check for the text "profile" on the page
});

test.fixme("Profile views increase", async ({ page }) => {
  // 1. nagivate to profile
  // 2. get the current profiles views
  // 3. visit the profile page x3
  // 4. get the current profile views and see if increased by 3
});

test.fixme("Link clicks increase", async ({ page }) => {
  // 1. nagivate to profile
  // 2. get the current link clicks
  // 3. click the link x3
  // 4. get the current link views and see if increased by 3
});

test.fixme("Link navigates", async ({ page }) => {
  // 1. nagivate to profile
  // 2. get a link and href
  // 3. click the link
  // 4. get the current url and should match href
});
