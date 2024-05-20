import { Locator, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING Locators and Auto-waitibilty    ☠️☠️

 *!    ☠️☠️  UNDERSTANDING Concept of LOCATOR'S STRICTNESS ☠️☠️
 *================================================================**/

test("Locator Strict Mode", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForTimeout(4000);

  //get a list
  const listHolder: Locator = page
    .getByRole("navigation", { name: "Sidepanel" })
    .locator("//li");

  //! PERFORMING DOM ACTION ON A LOCATOR WHICH RESOLVES TO MULTIPLE WEB ELEMENTS CAUSES ERROR.

  //await listHolder.click(); //! Creates Error

  //* PLAYWRIGHT UNDERSTANDS WHEN YOU PERFORM A MULTIPLE-ELEMENT OPERATION,
  //* SO THE FOLLOWING CALL WORKS PERFECTLY FINE WHEN THE LOCATOR RESOLVES TO MULTIPLE ELEMENTS.

  console.log(await listHolder.count());
});

test("Locator & Auto-waitibilty concept", async () => {

//----------- STEP 1 :: RESOLVING LOCATORS TO ELEMENTS --------------------------------------------------------------------------------------
  
//? https://playwright.dev/docs/actionability (all methods present in the list here are auto-waitable with list of actionability checks performed for each action)

//todo   ASSUMPTION: TEST TIMEOUT CONFIGURED IS 20 SECONDS.

  //* 🤠 PW tries to resolve the locator to an element ON ANY ACTION ONLY.
  //* If the required locator is not resolved within the given timeout (whether the action was auto-waitable or not), test fails with the TimeoutError.

  //  🤠SAMPLE ERROR 1 : locator.click: Test timeout of 20000ms exceeded.
  // Call log:
  // - waiting for locator('xxxxxxxxxxx')
  //   at tests\zzzzzz\xxxxxxx.spec.ts

  //* 🤠 NOTE:  PW DOES NOT CARE IF WRONG LOCATORS ARE STORED AS CONSTANTS,
  //*          IT WILL TRY TO RESOLVE LOCATORS TO ELEMENTS ON SOME ACTIONS ONLY.
  //* 🤠 Example : If the Locator is wrong.

  //todo EXCEPTION : METHODS WHICH ARE USED ON LIST OF ELEMENTS DOES NOT WAIT FOR LOCATORS TO RESOLVE TO ELEMENTS.
  //todo So, If the locator is wrong, the method will definitely give 0 or empty arrays (as per their return types).
  //todo  If the loctaor is right, method will immediately returns whatever is present in the page.
  //todo EXAMPLE : all(), count(), allInnerTexts(), allTextContents() used on a dynamic loading website.

  //?- ALSO SEE: tests\Handling-Elements\_23_Methods-Used-On-List-Of-Elements.spec.ts
  

  //* SO ALWAYS MAKE SURE TO USE EXPECTS & WAITS WHILE USING THE METHODS WHICH ARE USED ON LIST OF ELEMENTS.

//------------STEP 2 :: CONCEPT OF AUTO-WAITIBILTY ------------------------------------------------------------------------------------------------

  //! Lets say the locator is right and gets resolved within the time.

  //! Then comes AUTO_WAITIBILTY :
  //! 🤠 Playwright performs a range of actionability checks on the elements before making actions to ensure these actions behave as expected.
  //! 🤠 It auto-waits for all the relevant checks to pass and only then performs the requested action.
  //! 🤠 If the required checks do not pass within the given timeout, action fails with the TimeoutError.

 //  🤠SAMPLE ERROR 2 : locator.click: Test timeout of 20000ms exceeded.
  // Call log:
  //   - waiting for locator('#but1')
  //   -   locator resolved to <button disabled id="but1" type="button">Button1</button>
  //   - attempting click action
  //   -   waiting for element to be visible, enabled and stable
  //   -     element is not enabled - waiting...
  //     at tests\Locators\locator-misc.spec.ts:65:20

  //! Example : If user tries to click a disabled button.

});
