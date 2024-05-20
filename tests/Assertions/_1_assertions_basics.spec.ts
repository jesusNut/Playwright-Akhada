import { test, expect } from "@playwright/test";

/**========================================================================
 *!    ☠️☠️ ASSERTIONS - BASICS ☠️☠️

 //? https://playwright.dev/docs/test-assertions

 //* 🌐 Playwright includes test assertions in the form of "expect" function. 
 //* 🌐 There are 2 types of assertions:
   //! 🔰 a. Auto-retrying assertions - Assertions with async matchers are Auto-retrying assertions. Very stable.
   //example: await expect(locator).toBeAttached()
   //? https://playwright.dev/docs/test-assertions#auto-retrying-assertions

   //! 🔰 b. Non-retrying assertions - Assertions withOUT async matchers are NON-retrying assertions. More Falky.
   example: expect(value).toBe()
   //? https://playwright.dev/docs/test-assertions#non-retrying-assertions

   //* 🌐 Negating matchers - We can expect the opposite to be true by adding a .not to the front of the matchers.
   example: expect(value).not.toEqual(0);

   //* 🌐 Soft assertions - By default, failed assertion will terminate test execution. 
   //*    Playwright also supports soft assertions: failed soft assertions do not terminate test execution, but mark the test as failed.
   example : await expect.soft(page.getByTestId('status')).toHaveText('Success');

   //* 🌐 Custom Expect Message - We can specify a custom expect message as a second argument to the expect function.
   example : await expect(page.getByText('Name'), 'should be logged in').toBeVisible();

 *=========================================================================**/

test("Difference between auto-retrying and non-retrying assertions - ex.1", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  const allLinksAsLoc = page.locator("//app-gitrepos//div//ol//li");
  const allLinksAsArray = await page
    .locator("//app-gitrepos//div//ol//li")
    .all();
  //comment one of the assertions to verify other
  expect(allLinksAsArray.length).toBe(30); //! this will fail (non-retrying assertion)
  await expect(allLinksAsLoc).toHaveCount(30); //* this will pass (auto-retrying assertion)
});

test("Difference between auto-retrying and non-retrying assertions - ex.2", async ({
  page,
}) => {
  await page.goto("http://omayo.blogspot.com/");

  await page.locator('//button[normalize-space()="Try it"]').click();
  //await expect(page.locator('//button[@id="myBtn"]')).toBeDisabled(); //* this will pass
  expect(await page.locator('//button[@id="myBtn"]').isDisabled()).toBeTruthy(); //!this will fail
});

test("Soft Assertions", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");

  //enabled
  await expect.soft(page.locator('//button[@id="myBtn"]')).toBeDisabled();
  //the above line will fail but further lines will be executed.
  //verify the behavior by deleting/keeping the 'soft' from line no. 58, then run using CMD and see the Test Steps in HTML report.
  await page.locator('//button[normalize-space()="Try it"]').click();
  //disabled
  await expect(page.locator('//button[@id="myBtn"]')).toBeDisabled();
  //hidden
  await expect(page.locator('//input[@id="hbutton"]')).toBeHidden();
  //visible
  await expect(page.locator('//input[@name="textboxn"]')).toBeVisible();
});

test("Custom Expect Message", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");

  //enabled
  await expect(page.locator('//button[@id="myBtn"]')).toBeEnabled();
  await page.locator('//button[normalize-space()="Try it"]').click();
  //disabled
  await expect(page.locator('//button[@id="myBtn"]'), 'SHOULD BE DISABLED').toBeDisabled();
  //hidden
  await expect(page.locator('//input[@id="hbutton"]')).toBeHidden();
  //visible
  await expect(page.locator('//input[@name="textboxn"]')).toBeVisible();
});