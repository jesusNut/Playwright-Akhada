import { chromium, expect } from "@playwright/test";

//todo : 🤢 It is always recommended to save storageState files in '<rootfolder>/playwright/.auth/<yourFile>'. 🤢
//todo : 🤢 Then add the above path to .gitignore file , so that it is not pushed to github or in CI-CD pipeline. 🤢
//this file used for concept in : tests\API Testing\Authentication_saving_techniques\_2_save-usingGlobalSetup.spec.ts

async function globalSetup() {
  const browser = await chromium.launch();
  const newContext = await browser.newContext();
  const page = await newContext.newPage();
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
  await expect(
    page.locator("//h6[normalize-space()='Dashboard']")
  ).toBeVisible();

  await page.context().storageState({path : './playwright/.auth/globalSetupAuth.json'});
}


export default globalSetup;