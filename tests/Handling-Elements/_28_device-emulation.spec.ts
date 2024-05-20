import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️ DEVICE EMULATION  ☠️☠️

 //? https://www.youtube.com/watch?v=pWxVUPzjEhg
 //? https://playwright.dev/docs/emulation#devices

//* 😝 1.  We can configure a new device ONLY in the PROJECTS section of the config file.
//todo : Every project(browser) comes with a  predefined values for attributes such as viewport, isMobile etc.
//* 😝 2.  We can provide attributes for each project to override its default attribute value such as - viewport, baseURL, locale, timezoneID etc. in use section under selected project.[check point 5]

//* 😝 3. WAY 1 - Learn how to run the same script in both mobile screen resolutions as well as for desktop resolutions. - using test.info().project.name
//?      Antem-Bondar - Udemy [Mobile Device Emulator] 
//* 😝 4. WAY 2 - Learn how to run the same script in both mobile screen resolutions as well as for desktop resolutions. - using test.info().project.use.isMobile
//?      https://www.youtube.com/watch?v=NBHDp-QvGBQ 
//*    5. Overwriting pre-defined device setting - like if we have selected iphone, we can override its default viewport setting.
//?      https://www.youtube.com/watch?v=l3zjOCZwRhI&t=121s 

//todo ::💋💋 test.info()/testInfo object is used to fetch all details about a test at runtime.💋💋
*================================================================**/

test("Make a TC run on both mobile and desktop version - way 1", async ({
  page,
}) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  const viewport_height = page.viewportSize()?.height;
  const viewport_width = page.viewportSize()?.width;
  console.log(`Height is : ${viewport_height}`);
  console.log(`Height is : ${viewport_width}`);
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  //! 👇👇👇👇👇👇👇👇👇 WAY 1👇👇👇👇👇👇👇
  if (test.info().project.name == "my custom mobile") {
    await page.locator('//button[@aria-label="Toggle navigation"]').click();
  }
  //! 👇👇👇👇👇👇👇👇👇 WAY 2👇👇👇👇👇👇👇
  if (test.info().project.name == "my custom mobile") {
    await page.locator('//button[@aria-label="Toggle navigation"]').click();
  }
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
});

test("Make a TC run on both mobile and desktop version - way 2", async ({
  page,
}) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  const viewport_height = page.viewportSize()?.height;
  const viewport_width = page.viewportSize()?.width;
  console.log(`Height is : ${viewport_height}`);
  console.log(`Height is : ${viewport_width}`);
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  //! 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
  if (test.info().project.use.isMobile) {
    await page.locator('//button[@aria-label="Toggle navigation"]').click();
  }
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
});
