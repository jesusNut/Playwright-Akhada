import { expect, test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  HANDLING JS Alerts - Simple Alert, Confirmation alert and Alerts with textbox(prompt) ☠️☠️
 *==================================================================================================**/

//? Vignesh- UDEMY
//? https://playwright.dev/docs/next/dialogs#alert-confirm-prompt-dialogs

//! 😏 By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. 😏

test("DIALOGS ARE AUTO-DISMISSED BY PLAYWRIGHT", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  await page
    .locator("//button[normalize-space()='Click for JS Alert']")
    .click(); //dismissed by PW
  await page
    .locator("//button[normalize-space()='Click for JS Confirm']")
    .click(); //dismissed by PW
  await page
    .locator("//button[normalize-space()='Click for JS Prompt']")
    .click(); //dismissed by PW

  await page.waitForTimeout(3000);

  await page.locator("//a[normalize-space()='Elemental Selenium']").click();
});

test("SIMPLE ALERTS using Dialog Handler- on() method", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  //!😏😏 Always
  //! 1. handle the event first using on() method and
  //! 2. then only trigger that event (in our case event is clicking on button that produces the JS alert).
  //! This is how PW is designed.

  //handling event

  page.on("dialog", async (dialogbox) => {
    console.log(`Type of dialog/alert is : ${dialogbox.type()}`);
    console.log(`Message in dialog/alert is : ${dialogbox.message()}`);

    expect(dialogbox.type()).toBe("alert");
    expect(dialogbox.message()).toBe("I am a JS Alert");

    //! If we have handled the event dialog box manually, then we have to act (ACCEPT) upon it manually.
    //! In this case PW will not dismiss it by default.

    await dialogbox.accept();
  });

  await page.waitForTimeout(4000);

  // triggering event (clicking on button that produces the JS alert)
  await page
    .locator("//button[normalize-space()='Click for JS Alert']")
    .click();

  //assert the UI message

  await expect(page.locator("//p[@id='result']")).toHaveText(
    "You successfully clicked an alert"
  );
});

test("CONFIRMATION ALERTS using Dialog Handler- on() method -OK MESSAGE", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  //!😏😏 Always
  //! 1. handle the event first using on() method and
  //! 2. then only trigger that event (in our case event is clicking on button that produces the JS confirm box).
  //! This is how PW is designed.

  //handling event

  page.on("dialog", async (confirmationbox) => {
    console.log(`Type of dialog/alert is : ${confirmationbox.type()}`);
    console.log(`Message in dialog/alert is : ${confirmationbox.message()}`);

    expect(confirmationbox.type()).toBe("confirm");
    expect(confirmationbox.message()).toBe("I am a JS Confirm");

    //! If we have handled the event dialog box manually, then we have to act(ACCEPT) upon it manually.
    //! In this case PW will not dismiss it by default.

    await confirmationbox.accept();
  });

  await page.waitForTimeout(4000);

  // triggering event (clicking on button that produces the JS alert)
  await page
    .locator("//button[normalize-space()='Click for JS Confirm']")
    .click();

  //assert the UI message

  await expect(page.locator("//p[@id='result']")).toHaveText("You clicked: Ok");
});

test("CONFIRMATION ALERTS using Dialog Handler- on() method -CANCEL MESSAGE", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  //! 😏😏 Always
  //! 1. handle the event first using on() method and
  //! 2. then only trigger that event (in our case event is clicking on button that produces the JS confirm box).
  //! This is how PW is designed.

  //handling event

  page.on("dialog", async (confirmationbox) => {
    console.log(`Type of dialog/alert is : ${confirmationbox.type()}`);
    console.log(`Message in dialog/alert is : ${confirmationbox.message()}`);

    expect(confirmationbox.type()).toBe("confirm");
    expect(confirmationbox.message()).toBe("I am a JS Confirm");

    //! If we have handled the event dialog box manually, then we have to act(CANCEL) upon it manually.
    //! In this case PW will not dismiss it by default.

    await confirmationbox.dismiss();
  });

  await page.waitForTimeout(4000);

  // triggering event (clicking on button that produces the JS alert)
  await page
    .locator("//button[normalize-space()='Click for JS Confirm']")
    .click();

  //assert the UI message

  await expect(page.locator("//p[@id='result']")).toHaveText(
    "You clicked: Cancel"
  );
});

test("PROMPT ALERTS using Dialog Handler- on() method -ENTER MESSAGE", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  //! 😏😏 Always
  //! 1. handle the event first using on() method and
  //! 2. then only trigger that event (in our case event is clicking on button that produces the JS prompt box).
  //! This is how PW is designed.

  //handling event

  page.on("dialog", async (promptBox) => {
    console.log(`Type of dialog/alert is : ${promptBox.type()}`);
    console.log(`Message in dialog/alert is : ${promptBox.message()}`);

    expect(promptBox.type()).toBe("prompt");
    expect(promptBox.message()).toBe("I am a JS prompt");

    //! If we have handled the event dialog box manually, then we have to act(CANCEL) upon it manually.
    //! In this case PW will not dismiss it by default.

    await promptBox.accept("Abhishek is good God is best");
  });

  await page.waitForTimeout(4000);

  // triggering event (clicking on button that produces the JS alert)
  await page
    .locator("//button[normalize-space()='Click for JS Prompt']")
    .click();

  //assert the UI message

  await expect(page.locator("//p[@id='result']")).toHaveText(
    "You entered: Abhishek is good God is best"
  );
});


