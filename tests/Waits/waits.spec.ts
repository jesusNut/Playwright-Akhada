import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING WAITS ☠️☠️
 -----------------------------------------------------------------

 //? https://playwright.dev/docs/api/class-frame#frame-wait-for-function
 //? WaitForRequest & waitForResponse - covered in a separate spec file
 **      ☠️ Static waits
           1. page.waitForTimeout()
 **      ☠️ Explicit waits on page level-
           1. page.waitForLoadState() //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_23_methods-Used-On-List-Of-Elements.spec.ts
           2. page.waitForURL() 
           3. page.waitForEvent() //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_18_upload.spec.ts
                                  //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_19_download.spec.ts
                                  //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_10_tab-window-page-handling.spec.ts
           4. waitForRequest()
           5. waitForResponse() 
 **      ☠️ Explicitly for an element-
           1. page.waitForSelector() ⚠️DEPRICATED⚠️ //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Locators\locator-multiple_elements.spec.ts
           2. locator.waitFor() //? D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_23_methods-Used-On-List-Of-Elements.spec.ts
 *==============================================================**/

test("static wait", async ({ page }) => {
  //let us use a dynamically loading website and a method which is used on list of elements.
  //then we will use static wait to solve the issue that we get with dynamically loading websites.
  //? see : D:\VS CODE WORKSPACE\PlaywrightAkhada\tests\Handling-Elements\_23_methods-Used-On-List-Of-Elements.spec.ts

  await page.goto("https://letcode.in/elements");
  await page.locator('//input[@placeholder="Enter your git user name eg., ortonikc"]').fill('ortonikc');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(5000); //!static wait

  const allCourseTitles = await page.locator("//ol/li/a").all();
  console.log("Total course titles are " + allCourseTitles.length);
});

test('waitForURL()', async ({ page }) => {

    await page.goto('https://www.programsbuzz.com/');
    await page.locator('#edit-keys--2').fill('Playwright');
    await page.locator('#edit-submit--3').click();
    //await page.waitForURL('https://www.programsbuzz.com/search/node?keys=Playwright'); //style-1
    // await page.waitForURL((url)=>{
    //     console.log(url.toString()); //https://www.programsbuzz.com/search/node?keys=Playwright
    //     return url.toString().includes('Playwright');
    // }); //style -2
    await page.waitForURL('https://www.programsbuzz.com/search/node?keys=Playwright',{waitUntil : 'networkidle'}); //style-3
})

/**===============================================================
 *!    ☠️☠️  TIMEOUTS ☠️☠️
 -----------------------------------------------------------------

 ** There are broadly 2 types of timeouts on config level: 

 *! 🎃 1. Test timeout - for everything else
 *! 🎃 2. Expect timeout - for assertions

 //? https://playwright.dev/docs/test-timeouts
 
 *==============================================================**/




