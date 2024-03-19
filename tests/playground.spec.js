import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const username = "_test-profile-user-1";

test("Playground has title", async ({ page }) => {
  await page.goto("/playground");
  await expect(page).toHaveTitle(/Playground/);
});

test("Playground Opens correctly", async ({ page }) => {
  // 1. Navigate to playground page.
  await page.goto("/playground");

  // 2. See the input field to enter github username
  await page.getByPlaceholder("Enter github username").click();
  await page.getByPlaceholder("Enter github username").fill(username);

  const fs = require("fs");
  const jsonFilePath = `data/${username}.json`;
  const jsonData = fs.readFileSync(jsonFilePath, "utf8");
  const data = JSON.parse(jsonData);

  const userInput = await page.$("textarea[name=profileJson]");
  await userInput.click();
  await userInput.fill(JSON.stringify(data));

  await page.getByRole("button", { name: "Format" }).click();

  await page.getByRole("button", { name: "Validate" }).click();

  await page.getByRole("alert").filter({ hasText: "Valid Json" });

  await page.getByRole("button", { name: "Preview" }).click();
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/playground");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/github/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests (light)", async ({ page }) => {
    await page.goto("/playground");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/playground");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
