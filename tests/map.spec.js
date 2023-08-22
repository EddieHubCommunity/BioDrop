// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Map has title", async ({ page }) => {
  await page.goto("/map");
  await expect(page).toHaveTitle(/BioDrop Users Around The World/);
});

test("Map displays markers after visiting profiles", async ({ page }) => {
  const profileURLs = [
    "/distributethe6ix",
    "/Pradumnasaraf",
    "/amandamartin-dev",
    "/loftwah",
  ];

  for (const url of profileURLs) {
    await page.goto(url);
  }

  await page.goto("/map");
  await page.waitForSelector(".leaflet-marker-icon", { timeout: 5000 });
  const userMarkerLocator = page.locator(".leaflet-marker-icon");
  const userMarkers = await userMarkerLocator.count();
  expect(userMarkers).toBeGreaterThan(0);
});

test("should pass axe wcag accessibility tests", async ({ page }) => {
  await page.goto("/map");
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
