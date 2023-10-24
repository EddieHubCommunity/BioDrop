// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import connectMongo from "@config/mongo";
import { Profile, Link } from "@models/index";

test("Profile has title", async ({ page }) => {
  const username = "_test-profile-user-1";
  await page.goto(`/${username}`);
  await expect(page).toHaveTitle("Test User Name 1");
});

// Test to make sure profile name is displayed on page
test("Name appears on the page", async ({ page }) => {
  const username = "_test-profile-user-2";
  await page.goto(`/${username}`);
  await expect(page.locator("h1")).toHaveText("Test User Name 2");
});

test("Tabs change correctly", async ({ page }) => {
  const username = "_test-profile-user-6";
  await page.goto(`/${username}`);
  await expect(page.getByRole("button", { name: /My Links/ })).toHaveAttribute(
    "class",
    /border-tertiary-medium/,
  );
  await expect(page.locator("main")).not.toHaveText(/Top Teacher Award/);
  await page.getByRole("button", { name: /Milestones/ }).click();
  await expect(page.locator("h3").first()).toHaveText(/Top Teacher Award/);
});

test("Tabs have deep linking test milestone", async ({ page }) => {
  const username = "_test-profile-user-6";
  await page.goto(`/${username}?tab=milestones`);
  await expect(
    page.getByRole("button", { name: /Milestones/ }),
  ).toHaveAttribute("class", /border-tertiary-medium/);
  await expect(page.locator("h3").first()).toHaveText(/Top Teacher Award/);
});

test("Tabs have deep linking test repos", async ({ page }) => {
  const username = "_test-profile-user-6";
  await page.goto(`/${username}?tab=repos`);
  await expect(
    page.locator("main").getByRole("button", { name: /Repos/ }),
  ).toHaveAttribute("class", /border-tertiary-medium/);
  await expect(
    page.getByRole("link", { name: "EddieHubCommunity/BioDrop" }),
  ).toHaveText(/EddieHubCommunity\/BioDrop/);
});

test("Profile views increase", async ({ page }) => {
  await connectMongo();
  await page.goto("/_test-profile-user-3");
  const startingViews = await Profile.findOne(
    { username: "_test-profile-user-3" },
    "views",
  );

  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");
  await page.goto("/_test-profile-user-3");

  const endingViews = await Profile.findOne(
    { username: "_test-profile-user-3" },
    "views",
  );
  expect(startingViews.views).toEqual(endingViews.views - 3);
});

test("Link clicks increase", async ({page}) => {

  await connectMongo();
  await page.goto("/eddiejaoude");
  
  const startingLinks = await Link.find({ username: "eddiejaoude" })
  const startingLink = startingLinks[0]

  const previousClickCount = startingLink.clicks; 

  const profileLink = page.locator('a').filter({ hasText: startingLink.name })

  await profileLink.click();
  await page.waitForTimeout(1000);
  const currentLink = await Link.findOne({ name: startingLink.name, username: "eddiejaoude" })
  const updateCurrentLinkClicks = currentLink.clicks
  
  expect(updateCurrentLinkClicks).toEqual((previousClickCount + 1));
});

test("Profile not found redirects to search page with error message", async ({
  page,
}) => {
  const username = "_test-profile-does-not-exist";
  await page.goto(`/${username}`);
  await expect(page).toHaveURL("search?username=_test-profile-does-not-exist");
  await expect(page.locator(".alert-error")).toHaveText(
    `${username} not found`,
  );
});

test("Link navigates", async ({ page }) => {
  const popupPromise = page.waitForEvent("popup");
  const username = "_test-profile-user-6";
  const endpoint = `/${username}`;

  // 1. navigate to profile
  await page.goto(endpoint);

  // 2. click one of the links
  await page.getByRole("link", { name: "Twitter: Follow me" }).click();

  // 3. check that the link navigated
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL("https://twitter.com/eddiejaoude");
});

test("redirect to search when tag clicked", async ({ page }) => {
  await page.goto("/_test-profile-user-6");
  await page.getByRole("button", { name: "Open Source" }).first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("search?keyword=open%20source");
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests (_test-profile-user-6) (light)", async ({
    page,
  }) => {
    await page.goto("/_test-profile-user-6");
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
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (_test-profile-user-6) (dark)", async ({
    page,
  }) => {
    await page.goto("/_test-profile-user-6");
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
