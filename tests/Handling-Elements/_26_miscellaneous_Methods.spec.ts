import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  MISC METHODS  ☠️☠️
 *================================================================**/

 //!    👉 Methods covered : 

 //* 1. 🏃‍♀️‍➡️ dispatchEvent()- dispatchEvent does the action programatically.
 //* 2. 🏃‍♀️‍➡️ inputValue() - Returns the inputted value for the matching <input> or <textarea> or <select> element.
 //* 3. 🏃‍♀️‍➡️ selectText() -  Waits for actionability checks, then focuses the element and selects all its text content.
 //* 4. 🏃‍♀️‍➡️ highlight() - Highlight the corresponding element(s) on the screen. Useful for debugging, don't commit the code that uses locator.highlight().

test("dispathEvent()", async ({ page }) => {
  //? https://playwright.dev/docs/next/api/class-locator#locator-dispatch-event

  //dispatchEvent does the action programatically.

  await page.goto("https://omayo.blogspot.com/");
  await page.locator('//button[normalize-space()="Dropdown"]').click();
  await page.locator('//a[normalize-space()="Facebook"]').dispatchEvent('click');
});

test('inputValue()', async ({ page }) => {

  await page.goto('https://letcode.in/edit');

  //using inputValue() on an empty textbox
  const fetchedVal = await page.locator('//input[@id="fullName"]').inputValue();
  console.log(fetchedVal); //string of size 0
  console.log(typeof(fetchedVal)); //string

  //using inputValue() on a freshly filled textbox
   await page.locator('//input[@id="fullName"]').fill('Ankushe')
   const fetchedVal1 = await page.locator('//input[@id="fullName"]').inputValue();
   console.log(fetchedVal1);

   //using inputValue() on a already filled textbox
   const fetchedVal2 = await page.locator('//input[@id="join"]').inputValue();
   console.log(fetchedVal2);
  
})

test('selectText()', async ({ page }) => {

  await page.goto('https://letcode.in/edit');

     //using selectText() on an already filled textbox and then using keyboard actions to delete it
     await page.locator('//input[@id="join"]').selectText();
     await page.waitForTimeout(2000);
     await page.keyboard.press('Backspace');

      //using selectText() after filling a textbox and then using keyboard actions to delete it
      await page.locator('//input[@id="fullName"]').fill('CharanChumbak');
      await page.locator('//input[@id="fullName"]').selectText();
      await page.waitForTimeout(2000);
      await page.keyboard.press('Backspace');
  
})

test('highlight()', async ({ page }) => {

  await page.goto('https://letcode.in/edit');

  await page.locator('//input[@id="join"]').highlight();
  
})


