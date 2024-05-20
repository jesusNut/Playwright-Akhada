import { test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  HANDLING KEYBOARD ACTIONS ☠️☠️
 *==================================================================================================**/
//? https://www.youtube.com/watch?v=4pG2uSILSA0&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=38
//? https://playwright.dev/docs/next/api/class-keyboard#keyboard-type

//! 🤡🤡 page.keyboard.press() manually fires events as if they were generated from a real keyboard directly.
//! 🤡🤡 page.locator().press() focuses the matching element and then presses a combination of the keys.

test("2 possible different syntaxes to input via keyboard", async ({
  page,
}) => {
  await page.goto(
    "https://testpages.eviltester.com/styled/basic-html-form-test.html"
  );

  //!🤖🤖 using page.locator().press(<key>)
  const textAreaCommentLoc = page.locator('//textarea[@name="comments"]');
  await textAreaCommentLoc.press("Control+KeyA+KeyX");
  await page.waitForTimeout(3000);
  const usernameLoc = page.locator('//input[@name="username"]');
  await usernameLoc.press("Control+KeyV");
  //! 🤖🤖 using page.keyboard.press(<key>)
  await page.keyboard.press("PageDown");
  await page.waitForTimeout(3000);
  await page.keyboard.press("PageUp");
});

test("page.keyboard.down & up - using Shift + Arrow", async ({ page }) => {
  await page.goto(
    "https://testpages.eviltester.com/styled/basic-html-form-test.html"
  );

  const textAreaCommentLoc = page.locator('//textarea[@name="comments"]');
  const textInsidetextAreaCommentLoc = await textAreaCommentLoc.textContent();
  await textAreaCommentLoc.click();

  await page.keyboard.down("Shift");
  for (let index = 0; index < textInsidetextAreaCommentLoc!.length; index++) {
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(400);
  }
  await page.keyboard.up("Shift");
  await page.keyboard.press("Control+KeyX");
  const usernameLoc = page.locator('//input[@name="username"]');
  await usernameLoc.click();
  await page.keyboard.press("Control+KeyV");
});

test("page.keyboard.insertText", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/forms/layouts");

  await page.locator('//input[@id="inputFirstName"]').click();
  await page.keyboard.insertText("First name");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(1000);
  await page.keyboard.insertText("Last name");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(1000);
  await page.keyboard.insertText("abc.def@rohit.com");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(1000);
  await page.keyboard.insertText("www.chomu.com");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
});

test("page.keyboard.type", async ({ page }) => {
  await page.goto("https://letcode.in/edit");
  await page.waitForTimeout(2000);

  //first bring the focus to 'Enter your full Name' element and enter data using Keyboard
  await page.locator('//input[@id="fullName"]').focus();
  await page.waitForTimeout(2000);
  await page.keyboard.type("Abhishek", { delay: 700 });
});

/**=================================================================================================
 *!    🤣🤣  NOTES - page.keyboard..press/insertText/type differences 🤣🤣

 *todo  1. press() : Shortcut for keyboard.down() and keyboard.up()
        ✅ SHOULD BE USED PEREFRABLY FOR ALL WORKABLE SHORTCUTS/COMBOS- copy, paste, tab, enter etc.✅
 *todo  2. insertText() : Dispatches only input event, does not emit the keydown, keyup or keypress events -
        ✅ Puts everything in text at once [Analogous to fill() method].
 *todo  3. type(): Sends a keydown, keypress/input, and keyup event for each character in the text.
        ✅ [analogous to press-sequentially()] : should be used to simulate real user key presses with delay.
 *==================================================================================================**/

//! ✅✅ Combos are allowed for page.keyboard.press(<combo of keys>) && press() method should be used preferably for all workable combos ✅✅
test("page.keyboard.press/insertText/type", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //! 🔊 using press (way-1 : single)
  await page.locator('//input[@id="name"]').focus();
  await page.keyboard.press("KeyA");
  await page.keyboard.press("N");
  await page.keyboard.press("K");
  await page.keyboard.press("u");
  await page.keyboard.press("s");
  await page.keyboard.press("h");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(2100);
  //! 🔊 using press (way-2 : combo)
  await page.keyboard.press("S+I+N+G+L+A");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(2100);
  //! 🔊 using insertText
  await page.keyboard.insertText("Domicile");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(2100);
  //! 🔊 using type
  await page.keyboard.type("Punjab", { delay: 900 });
});
