// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const defaultUsers = 9;

test("Search has title", async ({ page }) => {
  await page.goto("/search");
  await expect(page).toHaveTitle(/Search/);
});

test("Navigate to the Search page", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Search" })
    .click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator("h1")).toHaveText("Search");
});

test("Search works correctly", async ({ page }) => {
  // 1. navigate to search page
  await page.goto("/search");

  // 2. show no users are listed
  await expect(page.locator("main li")).toHaveCount(defaultUsers);

  // 3. type in search and check that user with the name exist and check a name doesn't exist
  const input = page.locator("[name='keyword']");
  await input.type("_test-profile-user-1");
  await page.locator("[type='submit']").click();

  await expect(page.locator("main li")).toHaveCount(1);
});

test("Search page has random results when no search term used", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.fill("");
  await page.locator("[type='submit']").click();

  await expect(page.locator("main li")).toHaveCount(defaultUsers);
});

test("Search page shows random results after typing 1 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("e");
  await page.locator("[type='submit']").click();

  await expect(page.locator("main li")).toHaveCount(defaultUsers);
});

test("Search page shows results after typing 3 characters", async ({
  page,
}) => {
  await page.goto("/search");

  const input = page.locator("[name='keyword']");
  await input.type("aka");
  await page.locator("[type='submit']").click();

  await expect(page.locator("main li")).toContainText(["aka"]);
});

test("Search term persistence after navigating back", async ({ page }) => {
  // 1. Perform search
  await page.goto("/search");
  const input = page.locator("[name='keyword']");
  const searchTerm = "_test-profile-user-1";
  const searchName = "Test User Name 1";
  await input.fill(searchTerm);
  await page.locator("[type='submit']").click();

  // 2. Navigate to profile
  await expect(page).toHaveURL(`/search?userSearchParam=${searchTerm}`);
  await page.waitForLoadState("domcontentloaded");
  await page.locator(`a h2:has-text('${searchTerm}')`).click();
  await page.waitForURL(`/${searchTerm}`);

  // 3. Check if the profile is displayed
  await expect(page).toHaveURL(`/${searchTerm}`);
  await expect(page.locator("h1")).toHaveText(`${searchName}`);

  // 4. Go back and check that search term is still here
  await page.goBack();

  const inputAfterNavigation = page.locator("[name='keyword']");
  const inputFieldValue = await inputAfterNavigation.inputValue();

  expect(inputFieldValue).toBe(searchTerm);
});

test("find the profile after providing concise name", async ({ page }) => {
  const searchTerm = "_test-profile-user-1";
  // 1. Start from the homepage
  await page.goto("/");

  // 2. look for and click on the search element
  const searchLink = page.locator(
    "nav ul:first-child > li:first-child > a[href='/search']",
  );
  await searchLink.click();

  // 3. find the input field and type the whole name
  const input = page.locator("[name='keyword']");
  await input.fill(searchTerm);
  await page.locator("[type='submit']").click();

  // 4. select and click on the profile by matching name string
  const profileHeader = page.locator(`h2:has-text('${searchTerm}')`);
  const profileHeaderText = await profileHeader.innerText();
  await expect(profileHeaderText).toContain(searchTerm);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests (light)", async ({ page }) => {
    await page.goto("/search");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/search");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
