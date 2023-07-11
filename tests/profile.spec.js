// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import connectMongo from "@config/mongo";
import { Profile } from "@models/index";

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

test("Profile views increase", async ({ page }) => {
  await connectMongo();
  await page.goto("/_test-profile-user-3");
  const startingViews = await Profile.findOne(
    { username: "_test-profile-user-3" },
    "views"
  );

  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");

  const endingViews = await Profile.findOne(
    { username: "_test-profile-user-3" },
    "views"
  );
  expect(startingViews.views).toEqual(endingViews.views - 3);
});

test.fixme("Link clicks increase", async () => {
  // will need DB integration
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

test.fixme("Link navigates", async () => {
  // 1. navigate to profile
  // 2. get a link and href
  // 3. click the link
  // 4. get the current url and should match href
});

test("redirect to search when tag clicked", async ({ page }) => {
  await page.goto("/eddiejaoude");
  await page.getByRole("button", { name: "Open Source" }).first().click();
  await expect(page).toHaveURL("search?keyword=open%20source");
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: 'light' });

  test("should pass axe wcag accessibility tests (eddiejaoude) (light)", async ({
    page,
  }) => {
    await page.goto("/eddiejaoude");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should pass axe wcag accessibility tests (_test-wcag-user) (light)", async ({
    page,
  }) => {
    await page.goto("/_test-wcag-user");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: 'dark' });

  test("should pass axe wcag accessibility tests (eddiejaoude) (dark)", async ({
    page,
  }) => {
    await page.goto("/eddiejaoude");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should pass axe wcag accessibility tests (_test-wcag-user) (dark)", async ({
    page,
  }) => {
    await page.goto("/_test-wcag-user");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
