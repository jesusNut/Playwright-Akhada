import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING Usage of CSS and XPATH in PW  ☠️☠️
 *================================================================**/


test("Using xpath & CSS in PW", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //! way 1 of writing xpath (with xpath =XXX)
  await page.locator("xpath = //input[@placeholder='Username']").fill("Admin");
  await page
    .locator("xpath = //input[@placeholder='Password']")
    .fill("admin123");
  //! way 2 of writing xpath (without xpath =XXX)
  await page.locator("//button[normalize-space()='Login']").click();

  //! way 1 of writing CSS selectors (with css =XXX)
  await page.locator("css= .oxd-userdropdown-img").click();

  //! way 2 of writing CSS selectors (without xpath =XXX)
  await page
    .locator(
      "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > header:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)"
    )
    .click();
});
