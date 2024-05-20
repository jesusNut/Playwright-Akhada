import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  Saving Authentication state using Global Steup ☠️☠️

  //! We can use the globalSetup option in the configuration file to set something up once before running all tests. 
 
 //* 1. Create a Global setup file with .ts extension.- "tests\API Testing\Authentication_saving_techniques\global-setup.ts"
 //* 2. Write a function inside it to login into the AUT and save that storage state as a JSON file @ './playwright/.auth/globalSetupAuth.json'
 //* 3. Then go to playwright.config.ts file and make necessary changes as in video https://www.youtube.com/watch?v=CoXERxRPeik&t=1817s
 //* 4. During execution, PW will first run the globalSetup file, generate the storageState auth file and then use the file for each project(browser) as configured in config file.
 //* 5. After step 4 only, any hooks or tests will run.
 //* ⚠️ Login process in global setup file will not be present in reports/traces. ⚠️
 *================================================================**/

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
});

test("1.Verify timesheets page under quick launch menu", async ({ page }) => {
  await page.waitForURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    { waitUntil: "networkidle" }
  );
  await expect(page.locator("//button[@title='Timesheets']")).toBeVisible();
  await page.locator("//button[@title='Timesheets']").click();
  await page.waitForURL(/viewEmployeeTimesheet/, { waitUntil: "networkidle" });
  const innerdata = await page
    .locator("//li[@class='oxd-topbar-body-nav-tab --parent --visited']/span")
    .innerText();
  expect(innerdata).toBe("Timesheets ");
});
test("2.Add candidate for recruitment", async ({ page }) => {
  await page.getByRole("link", { name: "Recruitment" }).click();
  await page.waitForURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates",
    { waitUntil: "networkidle" }
  );
  await expect(page.locator("//button[normalize-space()='Add']")).toBeVisible();
  await page.locator("//button[normalize-space()='Add']").click();
  await page.waitForURL(/addCandidate/, { waitUntil: "networkidle" });
  await page.locator("//input[@placeholder='First Name']").fill("Chaman");
  await page.locator("//input[@placeholder='Last Name']").fill("Bahara");
  await page
    .locator(
      "//input[@placeholder='Type here' and ./parent::div/preceding-sibling::div/label[text()='Email']]"
    )
    .fill("Chaman.Bahara@kashmir.com");
  await page.locator("//button[normalize-space()='Save']").click();
  await expect(page.locator("//p[text()='Success']")).toBeVisible();
});

