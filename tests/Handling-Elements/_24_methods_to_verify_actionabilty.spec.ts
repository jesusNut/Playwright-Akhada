import { test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  METHODS TO VERIFY ACTIONABILITY OF ELEMENTS  ☠️☠️
 *==================================================================================================**/

//! 😇 Methods covered:
//* 1. isChecked() - Returns whether the element is checked. Throws if the element is not a checkbox or radio input.
//* 2. isDisabled() - Returns whether the element is disabled, the opposite of enabled.
//* 3. isEditable() - Returns whether the element is editable.
//* 4. isEnabled() - Returns whether the element is enabled.
//* 5. isHidden() - Returns whether the element is hidden, the opposite of visible.
//* 6. isVisible() - Returns whether the element is visible.

test("isChecked()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//input[@id="checkbox1"]').isChecked());
  console.log(await page.locator('//input[@id="radio1"]').isChecked());
  console.log(await page.locator('//input[@id="textbox1"]').isChecked()); //locator is neither a radio btn nor a checkbox, Gives error!
  //! Error: locator.isChecked: Error: Not a checkbox or radio button
});
test("isDisabled()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//button[@id="but1"]').isDisabled());
  console.log(await page.locator('//input[@id="tb2"]').isDisabled());
});
test("isEditable()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//input[@id="tb2"]').isEditable());
  console.log(
    await page
      .locator('//form[@name="form1"]//input[@type="text"]')
      .isEditable()
  );
  console.log(
    await page.locator('//button[normalize-space()="LogIn"]').isEditable()
  ); //locator is not a text input field but an enabled button //TRUE
  console.log(await page.locator('//button[@id="but1"]').isEditable()); //locator is not a text input field but a disbaled button //FALSE
});
test("isEnabled()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//button[@id="but1"]').isEnabled());
  console.log(await page.locator('//input[@id="tb2"]').isEnabled());
});
test("isHidden()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//input[@id="hbutton"]').isHidden());
  console.log(
    await page.locator('//button[normalize-space()="LogIn"]').isHidden()
  );
});

test("isVisible()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//input[@id="hbutton"]').isVisible());
  console.log(
    await page.locator('//button[normalize-space()="LogIn"]').isVisible()
  );
});
