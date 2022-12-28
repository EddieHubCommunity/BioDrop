// @ts-check
import { test, expect } from "@playwright/test";

test("docs page has title", async ({ page }) => {
  await page.goto("/docs");
  await expect(page).toHaveTitle(/Documentation/);
});

test("docs has quickstart link", async ({ page }) => {
  await page.goto("/docs");
  const getStarted = page.locator('h3:has-text("Quickstart")');

  await getStarted.click();

  await expect(page).toHaveURL(/quickstart/);
});

test("docs has github ui link", async ({ page }) => {
  await page.goto("/docs");
  const getStarted = page.locator('h3:has-text("GitHub UI")');

  await getStarted.click();

  await expect(page).toHaveURL(/github-ui/);
});

test("docs has gitpod link", async ({ page }) => {
  await page.goto("/docs");
  const getStarted = page.locator('h3:has-text("Gitpod")');

  await getStarted.click();

  await expect(page).toHaveURL(/gitpod/);
});
