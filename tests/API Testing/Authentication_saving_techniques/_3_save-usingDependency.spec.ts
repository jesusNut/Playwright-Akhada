import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  Saving Authentication state using Dependency ☠️☠️

 //* Project dependencies are a list of projects that need to run before the tests in another project run. 
 //* With project dependencies, you define a project that runs before all other projects. 
 //* This is the recommended way to configure global setup as with Project dependencies your HTML report will show the global setup,
 //* trace viewer will record a trace of the setup and fixtures can be used.
 
 //* 1. Create a Global setup file with .ts extension.- "tests\API Testing\Authentication_saving_techniques\global.setup.ts"
 //* 2. Write a test inside it to login into the AUT and save that storage state as a JSON file @ './playwright/.auth/dependencyAuth.json'
 //* 3. Then go to playwright.config.ts file and make necessary config changes as in video https://www.youtube.com/watch?v=CoXERxRPeik&t=1817s
 //* 4. During execution, PW will first run the 'global.setup.ts' file, generate the storageState auth file and then use the file for each project(browser) as configured in config file.
 //* 5. After step 4 only, any hooks or tests will run.
 //* ⚠️ Login process in global setup file will BE present in reports/traces. 
 *================================================================**/

//! 🔰 Use the below code to run all tests in this specfile using the mentioned storage state file. 🔰
//test.use({storageState : './playwright/.auth/dependencyAuth.json'})

//! 🔰 Reset storage state for this spec file to avoid being authenticated 🔰
//test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
});

test("a.Verify Home label is present on header", async ({ page }) => {
  await page.waitForURL(
    "https://rahulshettyacademy.com/client/dashboard/dash",
    { waitUntil: "networkidle" }
  );
  await expect(
    page.locator("//button[normalize-space()='HOME']")
  ).toBeVisible();
});
test("b. Add 3 products to cart and verify", async ({ page }) => {
  await page.waitForURL(
    "https://rahulshettyacademy.com/client/dashboard/dash",
    { waitUntil: "networkidle" }
  );
  await expect(
    page.locator(
      "//label[contains(text(),'maximum 9') and ./ancestor::section[@id='products']]"
    )
  ).toBeVisible();
});
