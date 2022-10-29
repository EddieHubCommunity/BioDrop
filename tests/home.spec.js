// @ts-check
import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/LinkFree/);
});

test("homepage has example link", async ({ page }) => {
  await page.goto("/");

  // create a locator
  const getStarted = page.getByText("Eddie Jaoude's");

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/eddiejaoude/);
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/");

  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();

  await expect(page).toHaveURL(/github/);
});
