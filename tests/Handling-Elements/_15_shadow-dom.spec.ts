import { test } from "@playwright/test";

/**==================================================================
 *!    ☠️☠️  HANDLING SHADOW DOM ☠️☠️
 *================================================================**/

 //? https://www.youtube.com/watch?v=h-qazVy6oY0&t=194s
 //? https://medium.com/helpshift-engineering/playwrights-playbook-conquering-shadowdom-elements-with-ease-35b65bfb8008
 //? https://www.youtube.com/watch?v=4v8iPJH8_hg&t=1s

//! ☠️☠️ All locators in Playwright by default work with elements in Shadow DOM. The exceptions are:

//! ☠️. Locating by XPath does not pierce shadow roots.
//! ☠️. Closed-mode shadow roots are not supported. (cannot automate such scenarios)

test("Using CSS Selector to directly pierce shadow roots", async ({ page }) => {
  await page.goto("https://letcode.in/shadow");
  await page.locator("#fname").fill("Abhishek"); 
  await page.waitForTimeout(2000);
  await page.locator("#open-shadow input[id='fname']").pressSequentially('MAHAAN');
});

test('Example 2', async ({ page }) => {

  await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
  await page.locator('#userName>#kils').fill('Abhsihek');
  //!🤯 handling iframe inside a shadow DOM
  await page.frameLocator('#pact1').locator('#glaf').fill('MoYe MOye'); 
  //here PW will automatically come to know about the fact that the iframe is inside of the shadow DOM(open).
  //!🤯 handling shadow dom element inside another shadow dom
  await page.locator('#pizza').fill('Forest');

  
})



