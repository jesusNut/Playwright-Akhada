import { BrowserContext, expect, test } from "@playwright/test";

//? Rahul Shetty -Udemy : Section 11 [49.]

//!-------🔰 AGENDA 🔰--------------------------------------------------------------------------------
//! In this example, we will save the storage state of a browserContext after login to AUT in a JSON file in beforeAll hook.
//! Then, we will use that JSON file as an argument to storagevalue property for a new browserContext which will then be used across all tests in the spec file.

//todo : ⚠️ THIS IS NOT THE BEST WAY TO RE-USE AUTHENTICATION/LOGIN STATE. JUST FOR UNDERSTANDING PURPOSE. ⚠️
//todo : ⚠️ This approach covers cookies and local storage based authentication ONLY⚠️
//todo : USE DEPENDENCY CONCEPT OR GLOBAL SETUP CONCEPT AS DISCUSSED IN 'Authentication_saving_techniques' TOPIC.

//!---------------------------------------------------------------------------------------------

//* Step 1️⃣ :  In BeforeAll hook , we will do login through UI and after logging in successfully,
//* we will take a snapshot of storage state as a whole- local & Cookie storage only. after login (means at this time, our token will be saved in local storage or cookie section(depending where does your AUT saves it) of the browserContext used.)
//* Then, we will save that snapshot in a JSON file.
//* Then we will create a new browserContext by passing the JSON file as its argument for 'storageState' property.

let commonBrowserContext: BrowserContext;
test.beforeAll(async ({ browser }) => {
  const page = await (await browser.newContext()).newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator('//input[@id="login"]').click();
  await expect(
    page.locator("//button[normalize-space()='Sign Out']")
  ).toBeVisible();
  await page.context().storageState({
    path: "./tests/API Testing/RShetty-practice/shettyauth.json",
  });
  commonBrowserContext = await browser.newContext({
    storageState: "./tests/API Testing/RShetty-practice/shettyauth.json",
  });
});

//* Step 2️⃣ : Write the test and use the browserContext that we created with the JSON file as arg (in step-1) in all other tests in the spec file. 
test("1. To verify if user is able to land on AUT already logged in using storageState", async () => {
  const page = await commonBrowserContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(
    page.locator("//button[normalize-space()='Sign Out']")
  ).toBeVisible();
  await page.waitForTimeout(4000);
});

test("2. Check filters on landing page", async () => {
  const page = await commonBrowserContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(
    page.locator("//section[@id='products']//div[@class='card']")
  ).toHaveCount(9);
  await page
    .locator(
      "//section[@id='sidebar']//form//label[text()='household']/preceding-sibling::input"
    )
    .check();
  await expect(
    page.locator("//section[@id='products']//div[@class='card']")
  ).toHaveCount(1);
  await page.waitForTimeout(4000);
});


