import { test, expect } from "@playwright/test";

test("User can login to dashboard", async ({ page }) => {
    /*  if the global config worked to set a logged in state, 
     I would expect 1 of 2 things to happen here, 
     either the Login button shouldn't show bc the context is already set 
     OR clicking on the github button would just work */
    await page.goto("/");
    await page.click('a >> text=Login');
    await page.click('button >> text=Sign in with GitHub');
    await page.screenshot({ path: 'screenshot.png' });
  });
