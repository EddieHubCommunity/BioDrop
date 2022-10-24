// @ts-check
const { test, expect } = require("@playwright/test");

test("Profile has title", async ({ page }) => {
  await page.goto("/eddiejaoude");
  await expect(page).toHaveTitle(/Eddie Jaoude/);
});

test("Name appears on the page", async ({ page }) => {
  // 1. nagivate to profile page
  await page.goto("/eddiejaoude");
  // 2. check for the text "profile" on the page
  await expect(page.locator('h1')).toHaveText(/Eddie Jaoude/);
});

test("Profile views increase", async ({ page }) => {
  // 1. navigate to profile
  await page.goto("/eddiejaoude");
  // 2. get the current profiles views
  const startingViews = await (await page.innerText('h2')).split(" ");
  console.log(startingViews);
  // 3. visit the profile page x3
  for (let i = 0; i < 3; i++){
    await page.goto("/");
    await page.goto("/eddiejaoude");
  }
  // 4. get the current profile views and see if increased by 3
  const endingViews = await (await page.innerText('h2')).split(" ");
  console.log(endingViews);
  expect(parseInt(startingViews[1])).toEqual((parseInt(endingViews[1]) - 3));
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
