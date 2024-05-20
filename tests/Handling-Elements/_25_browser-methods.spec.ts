import { test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  BROWSER METHODS - URL(), TITLE()  ☠️☠️
 *==================================================================================================**/

test("Get page URL", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/");
  console.log(page.url());

  //click on the link
  await page.locator('//a[normalize-space()="Data List Filter"]').click();
  await page.waitForTimeout(2000);
  console.log(page.url());
  //Navigate back
  await page.goBack();
  await page.waitForTimeout(2000);
  console.log(page.url());
});

test("Get page TITLE", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/");
  console.log(await page.title());

  //click on the link
  await page.locator('//a[normalize-space()="Data List Filter"]').click();
  await page.waitForTimeout(2000);
  console.log(await page.title());
  //Navigate back
  await page.goBack();
  await page.waitForTimeout(2000);
  console.log(await page.title());
});
