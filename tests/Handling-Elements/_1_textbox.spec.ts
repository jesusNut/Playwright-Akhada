import { Page, test } from "@playwright/test";

/**========================================================================
 *!    ☠️☠️  HANDLING TEXT BOXES - fill () and pressSequentially()☠️☠️
 //?   Inner working :: https://www.youtube.com/watch?v=_bMZrOH9jhk&t=1885s
 *=========================================================================**/

test("Handling textboxes - fill method in empty textbox", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
});

//! 🤡 fill() method used in a pre-filled textbox/text area deletes the pre-filled data and enters the provided data.  🤡

test("Handling textboxes - fill method in pre-filled textbox", async ({
  page,
}) => {
  await page.goto("https://letcode.in/edit");
  await page.locator("(//input[@id='join'])[1]").fill("Hooman");
  await page.waitForTimeout(3000);
});

//! 🤡 Setting 'force' to true means that you want to bypass the actionability check. 🤡
//! 🤡 So, your test cases will not fail when 'force' = true. 🤡
//! 🤡 It does not mean that we will start typing in a disabled field. 🤡
//? https://stackoverflow.com/questions/70124342/playwright-force-click-on-hidden-element-does-not-work

test("Handling textboxes - fill method with force option", async ({ page }) => {
  await page.goto("https://selectorshub.com/xpath-practice-page/");
  // await page.locator("//form[@name='form1']/input[1]").fill('Abhishek', {force: true});
  await page
    .getByPlaceholder("First Enter name")
    .fill("Abhishek", { force: true });
  console.log("Hi Abhishek bro...");

  await page.waitForTimeout(3000);
});

test("Handling textboxes - press sequentially method", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page
    .locator("//input[@id='email']")
    .pressSequentially("admin@admin.com");
  await page
    .locator("//input[@id='password']")
    .pressSequentially("admin123", { delay: 100 });
  await page.locator("//button[@id='submitLoginBtn']").press("Enter");
  await page.waitForTimeout(3000);
});
//! 🤡 pressSequentially() & press() method used in a pre-filled textbox/text area retains the pre-filled data and enters the provided data.  🤡

test("Handling textboxes - press sequentially method with pre-filled data", async ({
  page,
}) => {
  //append the second text box on form with 'Abhishek is great'
  await page.goto("https://letcode.in/edit");
  await page.locator("//input[@id='fullName']").press("Tab");
  await page.locator("//input[@id='join']").press("End", { delay: 100 });
  await page
    .locator("//input[@id='join']")
    .pressSequentially("Abhishek is great");
});

test("Handling text area- fill", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");
  await page.locator("#HTML2").getByRole("textbox").fill("I am the best...");
  await page.waitForTimeout(3000);
});

test("Deleting/clearing pre-selected text - traditional", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");

  await textboxClearUtil(
    "//textarea[normalize-space()='The cat was playing in the garden.']",
    page
  );
  await page
    .getByText("The cat was playing in the")
    .fill("I am always the best");
});

//! 🤡🤡 Note that you can pass an empty string to clear the input field. 🤡🤡
test("Deleting/clearing pre-selected text - using fill", async ({ page }) => {
  await page.goto("https://letcode.in/edit");
  await page.locator("//input[@id='join']").fill("");
  await page.waitForTimeout(3000);
});

test("Deleting/clearing pre-selected text - clear () method", async ({
  page,
}) => {
  await page.goto("https://letcode.in/edit");
  await page.locator("//input[@id='join']").clear();
  await page.locator("//input[@id='getMe']").clear();
  await page.locator("//input[@id='clearMe']").clear();
});

//! 🤡🤡 page.keyboard.press() manually fires events as if they were generated from a real keyboard directly.
//!       {covered in notes as Keyboard events}
//! 🤡🤡 page.locator().press() focuses the matching element and presses a combination of the keys.
test("page.locator().press() vs page.keyboard.press()", async ({ page }) => {
  //! using page.locator('xxxx').press(zzz)
  await page.goto("https://letcode.in/edit");
  await page.locator('//input[@id="fullName"]').fill("Abhishek Bhardwaj");
  await page.locator('//input[@id="fullName"]').press("Tab");
  await page.waitForTimeout(2100);
  await page.locator('//input[@id="join"]').press("Backspace");
  await page.waitForTimeout(2100);
  //! using page.keyboard.press(zzz)
  await page.reload();
  await page.locator('//input[@id="fullName"]').fill("Abhishek Bhardwaj");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(2100);
  await page.keyboard.press("Backspace");
});

test("page.locator().press() method - TAB & ENTER (SINGLE KEYS)", async ({
  page,
}) => {
  await page.goto("https://artoftesting.com/samplesiteforselenium");
  await page.locator('//input[@id="fname"]').fill("Money bhai is love");
  await page.locator('//input[@id="fname"]').press("Tab");
  await page.waitForTimeout(2100);
  await page.locator('//button[@id="idOfButton"]').press("Enter");
});

//! ✅✅ Combos are allowed for page.locator().press(<combo of keys>) and press() method should be used preferably for all workable combos ✅✅
test("page.locator().press() method - COMBO OF KEYS", async ({ page }) => {
  await page.goto("https://letcode.in/edit");
  await page.locator("//input[@id='clearMe']").press("Control+KeyA+Backspace"); //delete the prefilled text
  await page.waitForTimeout(2100);
  await page.locator("//input[@id='getMe']").press("Control+KeyA"); //select all
  await page.waitForTimeout(2100);
  await page.locator("//input[@id='getMe']").press("Control+KeyC"); //copy
  await page.waitForTimeout(2100);
  await page.locator("//input[@id='clearMe']").press("Control+KeyV"); //paste
  //!🤡 Browser-level shortcuts ❌ (Ctrl+O, Ctrl+Shift+T) - does not work in PW
  //!🤡 DOM-level shortcuts ✅ (Ctrl+A, Ctrl+C, Ctrl+V) - works in PW
});

//! 🤡🤡 Utility method of clear the pre-filled textboxes/input fields traditionally 🤡🤡
const textboxClearUtil = async (loc: string, page: Page) => {
  await page.locator(loc).press("Control+a");
  await page.locator(loc).press("Backspace");
};
