// @ts-check
import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

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
  const startingViews = await page.innerText("#profile-views");
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");

  const endingViews = await page.innerText("#profile-views");
  expect(parseInt(startingViews)).toEqual(parseInt(endingViews) - 3);
});

test("Link clicks increase", async ({ page }) => {
  await page.goto("/_test-profile-user-4");

  const link = page.locator("text=/Link 1\\s*/i");

  const startingClicks = (await link.innerText()).match(/(\d+)/g);

  for (const i in new Array(3)) {
    await link.click();

    await page.waitForURL("https://eddiejaoude.io");

    await page.goto("/_test-profile-user-4");

    const endingClicks = (await link.innerText()).match(/(\d+)/g);

    expect(parseInt(startingClicks)).toEqual(parseInt(endingClicks) + i + 1);
  }
});

test("Profile not found redirects to search page with error message", async ({
  page,
}) => {
  const username = "_test-profile-does-not-exist";
  await page.goto(`/${username}`);
  await expect(page).toHaveURL("search?username=_test-profile-does-not-exist");
  await expect(page.locator(".alert-error")).toHaveText(
    `${username} not found`
  );
});

test.fixme("Link navigates", async ({ page }) => {
  // 1. navigate to profile
  // 2. get a link and href
  // 3. click the link
  // 4. get the current url and should match href
});

test.fixme("redirect to search when tag clicked", async ({ page }) => {
  // 1. redirect to profile
  // 2. get a link and href
  // 3. click the link
  // 4. get the current url and should match href
});

test("should pass axe wcag accessibility tests (eddiejaoude)", async ({
  page,
}) => {
  await page.goto("/eddiejaoude");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should pass axe wcag accessibility tests (_test-wcag-user)", async ({
  page,
}) => {
  await page.goto("/_test-wcag-user");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
