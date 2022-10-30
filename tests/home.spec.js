// @ts-check
import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/LinkFree/);
});

test("homepage has example link", async ({ page }) => {
  await page.goto("/");
  const getStarted = page.getByText("Eddie Jaoude's");

  await getStarted.click();

  await expect(page).toHaveURL(/eddiejaoude/);
});

test("Footer link goes to GitHub", async ({ page }) => {
  await page.goto("/");
  const getFooter = page.getByText("Powered by EddieHub");

  await getFooter.click();

  await expect(page).toHaveURL(/github/);
});
