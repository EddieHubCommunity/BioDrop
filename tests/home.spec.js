// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getTotalStats } from "pages/api/statistics/totals";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BioDrop/);
});

test("homepage has example link", async ({ page }) => {
  await page.goto("/");
  const getStarted = page.getByText("Example");
  await getStarted.click();
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/eddiejaoude/);
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/github/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests (light)", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Data rendered correctly on home page", () => {
  test("Total active rendered", async ({ page }) => {
    const { stats: totalStats } = await getTotalStats();
    const abbreviatedActive = abbreviateNumber(totalStats.active);
    await page.goto("/");
    const section = page.getByText("Active Users");
    const parent = section.locator("..");
    const item = parent.locator("dd div:nth-child(1)");
    await expect(item).toHaveText(abbreviatedActive);
  });

  test("Profile views rendered", async ({ page }) => {
    const { stats: totalStats } = await getTotalStats();
    const abbreviatedViews = abbreviateNumber(totalStats.views);
    await page.goto("/");
    const section = page.getByText("Profile Views");
    const parent = section.locator("..");
    const item = parent.locator("dd div:nth-child(1)");
    await expect(item).toHaveText(abbreviatedViews);
  });
});
