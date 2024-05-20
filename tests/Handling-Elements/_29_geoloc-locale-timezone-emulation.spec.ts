import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️ EMULATING GEOLOCATION, LOCALES & TIMEZONES ☠️☠️

 //? https://playwright.dev/docs/emulation#geolocation
 //? https://playwright.dev/docs/emulation#permissions
 //? https://playwright.dev/docs/emulation#locale--timezone
 //? https://www.youtube.com/watch?v=l3zjOCZwRhI&t=121s

//* 😝 1.  We can configure GEOLOCATION, LOCALES, TIMEZONES, PERMISSIONS for all pages and for all projects (browsers) : in top level use: {} object in config file.
//? https://playwright.dev/docs/test-use-options#emulation-options

//* 😝 2.  We can configure GEOLOCATION, LOCALES , TIMEZONES, PERMISSIONS for individual  projects (browsers) : in Projects -> <select a project> -> use{} of config file.
//todo :: Configuration done on level 2, overrides config settings on level 1.

//* 😝 3.  At spec file level. - using test.use() - can be used for any project(browser)
*================================================================**/

test.skip("To check GEOLOCATION and PERMISSIONS", async ({ page }) => {
  await page.goto("https://www.gps-coordinates.net/my-location");
  await page.waitForTimeout(6000);
});

test.skip("To LOCALE & TIMEZONE", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.waitForTimeout(3000);
});

//👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
test.use({
  geolocation: { longitude: 55.258133, latitude: 25.18561 },
  permissions: ["geolocation"],
  locale: "	th_TH",
});

test("To test configuration @ spec file level", async ({ page }) => {
  await page.goto("https://www.gps-coordinates.net/my-location");
  await page.waitForTimeout(6000);
  await page.goto("https://www.google.com/");
  await page.waitForTimeout(3000);
});
