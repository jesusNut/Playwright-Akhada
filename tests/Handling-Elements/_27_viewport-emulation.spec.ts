import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  USING VIEWPORT and MAXIMIZING BROWSER  ☠️☠️

 //? https://www.youtube.com/watch?v=uF5nCRI_uME
 //? https://playwright.dev/docs/emulation#viewport
 //? https://playwright.dev/docs/api/class-page#page-set-viewport-size
 //? https://playwright.dev/docs/test-use-options#emulation-options 

//! There is no direct way to maximize the browser.
//! Browsers can be maximized by manipulating viewport at different levels:

//*   😬 a. at config file level for all projects[browser] : Pass option 'viewport' to the top level use: {} object in the Playwright config.
//?      https://github.com/microsoft/playwright/issues/13815
//*   😬 b. at config file level for each project[browser] : PROJECTS section of the config file.
//todo : If viewport is configured for each project in PROJECTS->use{} section of config file, then it will override viewport configured in direct 'use{}' object
//todo : If a device remains configured in PROJECTS->use{} section of config file, then it will override viewport configured in direct 'use{}' object. 
//todo   This is because, every ...device[XXXX] will contain its predefined values of viewport.
//*   😬 c. at spec file level. - using test.use() - can be used for any project(browser)
//*   😬 d. at test case level. - using test.setViewportSize() - can be used for any project(browser)
 *================================================================**/

//! 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
//test.use({ viewport: { width: 1536, height: 824 } });

//--------------------------------------------------------------------

test("finding current viewport sizes", async ({ page }) => {
  //! 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
  // await page.setViewportSize({
  //   width: 1536,
  //   height : 824
  // });

  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  const viewport_height = page.viewportSize()?.height;
  const viewport_width = page.viewportSize()?.width;
  console.log(`Height is : ${viewport_height}`);
  console.log(`Height is : ${viewport_width}`);
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.waitForTimeout(5000);
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
});
