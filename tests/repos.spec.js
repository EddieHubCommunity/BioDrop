// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Click on repos in navbar navigates to repo page", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Repos" })
    .click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL("/repos");
});

test("Repos has title", async ({ page }) => {
  await page.goto("/repos");
  await expect(page.locator("h1")).toHaveText("Community Repos");
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ page }) => {
    await page.goto("/repos");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/repos");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
