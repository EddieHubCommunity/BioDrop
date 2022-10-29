// @ts-check
const { test, expect } = require("@playwright/test");

test("Profile has title", async ({ page }) => {
  const username = "_test-profile-user-1";
  await page.goto(`/${username}`);
  await expect(page).toHaveTitle(username.toUpperCase());
});

// Test to make sure profile name is displayed on page
test("Name appears on the page", async ({ page }) => {
  const username = "_test-profile-user-2";
  await page.goto(`/${username}`);
  await expect(page.locator("h1")).toHaveText(username.toUpperCase());
});

// Test to see if going to a profile 3X increases views by 3
test("Profile views increase", async ({ page }) => {
  await page.goto("/_test-profile-user-3");
  const startingViews = (await page.innerText("h2")).split(" ")[1];
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");

  const endingViews = (await page.innerText("h2")).split(" ")[1];
  expect(parseInt(startingViews)).toEqual(parseInt(endingViews) - 3);
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
