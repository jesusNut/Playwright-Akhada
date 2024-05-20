import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING NAVIGATION  ☠️☠️
 *================================================================**/

test("Handling navigation - go back, go forward, refresh", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/");

  //click on the link
  await page.locator('//a[normalize-space()="Data List Filter"]').click();
  await page.waitForTimeout(2000);
  //Navigate back
  await page.goBack();
  await page.waitForTimeout(2000);
  //Navigate forward
  await page.goForward();
  await page.waitForTimeout(2000);
  //Refresh
  await page.reload();
});
