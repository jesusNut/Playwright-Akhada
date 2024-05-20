import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING FOCUS & BLUR  ☠️☠️
 *================================================================**/

//! 🤪 focus() Method : method sets focus on the specified element, if it can be focused.
//!    The focused element is the element that will receive keyboard and similar events by default.
//! 🤪 blur() Method : removes keyboard focus from the current element.

test("Using focus() & blur() method", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.waitForTimeout(2000);
  const addressField = page.locator('//textarea[@id="textarea"]');
  const phoneField = page.locator('//input[@id="phone"]');

  //first bring the focus to 'Address' element and enter data using Keyboard
  await addressField.focus();
  await page.waitForTimeout(2000);
  await page.keyboard.type("Dubai", { delay: 700 });

  //remove the focus from 'Address' element.
  await addressField.blur();
  await page.keyboard.press("I+W+I+L+L+N+O+T+G+E+T+P+R+I+N+T+E+D"); //this will not get printed anaywhere
  await page.waitForTimeout(2000);

  //again, put focus on phone field and enter data using Keyboard
  await phoneField.focus();
  await page.waitForTimeout(2000);
  await page.keyboard.press("5+5+5+5+5");
});
