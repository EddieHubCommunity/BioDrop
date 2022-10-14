// @ts-check
const { test, expect } = require("@playwright/test");

test("homepage has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
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
