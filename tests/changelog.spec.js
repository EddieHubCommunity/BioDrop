import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Changelog Page
test("Changelog has title", async ({ page }) => {
  await page.goto("/changelog");
  await expect(page).toHaveTitle("BioDrop user changelog");
});

// Navigating to Changelog Page
test("Navigate to Changelog", async ({ page }) => {
  await page.goto("/roadmap");
  await page.getByRole("link", { name: "See full list" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator("h1")).toHaveText("Changelog");
});

// Changelog Listed
test("Changelog listed", async ({ page }) => {
  await page.goto("/changelog");
  const listItems = await page.locator("main li").count();
  expect(listItems).toBeGreaterThan(1);
});

// Footer
test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/changelog");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/github/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ page }) => {
    await page.goto("/changelog");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/changelog");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
