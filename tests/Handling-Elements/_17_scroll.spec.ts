import { test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  HANDLING SCROLLING ☠️☠️
 *==================================================================================================**/

//? https://www.youtube.com/watch?v=VULTd5_SZ5Q
//? https://www.youtube.com/watch?v=VDf7nfjLwRU 
//? https://www.youtube.com/watch?v=UXj0LTBff7Y 

test("Handling scroll bar - Scroll using pixels vertically using EVALUATE", async ({
  page,
}) => {
  await page.goto("https://commitquality.com/practice-general-components");
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    //here we can use any scroll function on window object.
    window.scrollBy(0, 100);
  });
});

test("Handling scroll bar - Scroll till element into view", async ({
  page,
}) => {
  await page.goto("https://commitquality.com/practice-general-components");
  await page.waitForTimeout(2000);
  await page
    .locator('//a[normalize-space()="Go to practice page"]')
    .scrollIntoViewIfNeeded();
});

test("Handling scroll bar - Scroll using pixels vertically using MOUSE WHEEL", async ({
  page,
}) => {
  await page.goto("https://commitquality.com/practice-general-components");
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 100);
});


