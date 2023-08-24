// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import connectMongo from "@config/mongo";
import { Profile } from "@models/index";

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

test("Link navigates", async ({ page }) => { 
  const username = "_test-profile-user-3";
  const endpoint = `/${username}`
  // 1. navigate to profile
  await page.goto(endpoint);

  //   // 2. get a link and href
  const anchorTags = await page.$$("a");
  // Loop through each anchor tag array
  let hrefToNavigate=""
  for (const anchor of anchorTags) {
    const href = await anchor.getAttribute("href");

    // Check if the href includes the username
    if (href == "https://www.youtube.com/watch?v=05HEeCQSKRE&list=PL4lTrYcDuAfyU0fJcCGLm5r-hM_rqXaxd") {
      hrefToNavigate =  href;
      break; 
    }
  }
    const profileLinkSelector = `a[href="${hrefToNavigate}"]`;
    const profileLink = page.locator(profileLinkSelector);
    // This is working
    // profileLink Locator@a[href="https://www.youtube.com/watch?v=05HEeCQSKRE&list=PL4lTrYcDuAfyU0fJcCGLm5r-hM_rqXaxd"]
    
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const pagePromise = context.waitForEvent('page');
    
    // We are timing out here the following click
    await profileLink.click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState('networkidle');
    const currentUrl = newPage.url();
    // currentUrl http://localhost:3000/_test-profile-user-3
    expect(currentUrl).toBe(hrefToNavigate);
    await browser.close();
});

test("redirect to search when tag clicked", async ({ page }) => {
  await page.goto("/_test-profile-user-6");
  await page.getByRole("button", { name: "Open Source" }).first().click();
  await expect(page).toHaveURL("search?keyword=open%20source");
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: 'light' });

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
  test.use({ colorScheme: 'dark' });

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
