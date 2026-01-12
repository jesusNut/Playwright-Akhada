import { expect, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING FILTERS ☠️☠️

        //todo : Filtering: pick all matching elements as a collection, then filter among them;
        //todo  Find All elements → Filter → Match
 
       ☠️ Filtering using text- hasText() and hasNotText()

         ✔ hasText:
           Searches deeply (all descendants' text) not just the specified locator's text.
           Is case-insensitive by default (use regex otherwise).
           Uses substring match.

       ☠️ Filtering using Child elements/descendants
 *================================================================**/

test("using filter - hasText", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();

  //! using filtering with text
  //hasText: "Leave" filters <li> elements by checking visible text inside all nested children, not just the <li> node itself.
  //"Leave" text/substring is found at child 'span' of one of the li which will be then filtered. 

   await page.getByRole("listitem") // store all <li> elements
   .filter({ hasText: "Leave" }) // filter down to the one li with text 'Leave'.
   .click(); //✅ .click on the fileterd li.
  //await page.getByRole("listitem").filter({ hasText: "Lea" }).click(); //✅ substring match
  //await page.getByRole("listitem").filter({ hasText: "leave" }).click(); //✅ case insensitive match
  //await page.getByRole("listitem").filter({ hasText: /Leave/ }).click(); //✅ exactly check for 'Leave'- caseSensitive

 //! most robust way:

  //await page.getByRole("listitem").filter({ has: page.locator("span", { hasText: "Leave" }) }).click();
});

test("using filter - hasNotText", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/inventory.html");

  //! using filtering with text not matching

  await page
    .locator("//div[@class='inventory_item_label']/a")
    .filter({ hasNotText: /sauce/i })
    .click();

  const header = page.getByText(/Test.allTheThings/i);
  await expect(header).toBeVisible();
});

test("using filter - has (using child)", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
  await page.getByRole("listitem").filter({ hasText: "Leave" }).click();

  //! using filtering with child element

  //.filter({ has: childLocator }) → reduces parent elements to those that contain the child
  //Use Playwright locators(getByXXX, locator()), not raw strings as value of 'has'.

  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("link", { name: /My Leave/i }) }) //using getByxxx()- playwright locator as value of 'has'
    .click(); //✅

     await page
    .getByRole("listitem")
    .filter({ has: page.locator("//a[contains(text(),'My Leave')]") }) //using locator()- playwright locator as value of 'has'
    .click(); //✅

   // await page.getByRole("listitem").filter({ has: '//span[text()="Admin"]' }) }).click(); ❌ string, will not work as value of 'has'

});

test("using filter - not having child", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
  await page.getByRole("listitem").filter({ hasText: "Leave" }).click();
  await page.waitForTimeout(4000);

  //! using filtering with not having child element

  const getNonDropDownElements = page
    .getByRole("navigation", { name: "Topbar Menu" })
    .getByRole("list")
    .getByRole("listitem")
    .filter({ hasNot: page.locator("//span") });

  console.log(await getNonDropDownElements.count());
  await expect(getNonDropDownElements).toHaveCount(4);
});
