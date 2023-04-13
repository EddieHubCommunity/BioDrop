import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright").default;

const username = "_test-profile-user-1";

test("Playground has title", async ({ page }) => {
  await page.goto("/playground");
  await expect(page).toHaveTitle(/Playground/);
});

test("Navigate to Playground", async ({ page }) => {
  await page.goto("/");
  await page.locator("a:visible", { hasText: "Playground" }).click();
  await expect(page.locator("h1")).toHaveText("Playground");
});

test("Playground Opens correctly", async ({ page }) => {
  // 1. Navigate to playground page.
  await page.goto("playground");

  // 2. See the input field to enter github username
  await page.getByPlaceholder("Enter github username").click();
  await page.getByPlaceholder("Enter github username").fill(username);

  const userInput = await page.$("textarea[name = profileJson]");
  await userInput.click();
  await userInput.fill(`{
    "name" : "${username.toUpperCase()}",
    "type": "personal",
    "bio" : "Bio for ${username}",
    "links" : [
      {
        "name" : "Link 1",
        "url" : "http://eddiejaoude.io",
        "icon" : "FaBad-Icon"
      },
      {
        "name" : "Link 2",
        "url" : "http://eddiehub.org",
        "icon" : "link"
      }
    ]
  }`);

  await page.getByRole("button", { name: "Format" }).click();

  await page.getByRole("button", { name: "Validate" }).click();

  await page.getByRole("alert").filter({ hasText: "Valid Json" });

  await page.getByRole("button", { name: "Preview" }).click();
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/playground");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();

  await expect(page).toHaveURL(/github/);
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/playground");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
