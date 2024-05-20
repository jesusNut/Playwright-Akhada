import { Locator, test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  UNDERSTANDING ISSUE WITH METHODS USED ON LIST OF ELEMENTS   ☠️☠️
 *!    ☠️☠️  UNDERSTANDING CORRECT WAY TO USE METHODS USED ON LIST OF ELEMENTS   ☠️☠️
 *==================================================================================================**/

// Lets assume the locator provided to fetch a list of elements is correct.
//todo 🧐 METHODS WHICH ARE USED ON LIST OF ELEMENTS DOES NOT WAIT FOR LOCATORS TO RESOLVE TO ELEMENTS.🧐
//!    🧐 Instead immediately returns whatever is present in the page.🧐
//!    👨‍🍳 On the pages where the list is static (static websites), the methods might work well.👨‍🍳
//!    👨‍🍳 BUT ON THE PAGES HERE LISTS ARE DYNAMICALLY LOADED (dynamically loading websites), results will be flaky.👨‍🍳
//!    👉 Methods covered : all(), count(), allInnerTexts(), allTextContents()


test("No Issues with METHODS USED ON A STATIC LIST OF ELEMENTS (static website) ", async ({
  page,
}) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/data-list-filter-demo"
  );

  //   //all() method
  //   const allelements: Locator[] = await page
  //     .locator("//input[@id='input-search']/following-sibling::div/div/div/h5")
  //     .all();
  //   console.log(allelements.length);

  //   //count() method
  //   const totalCount = await page
  //     .locator("//input[@id='input-search']/following-sibling::div/div/div/h5")
  //     .count();
  //   console.log(totalCount);

  //   //allTextContents()
  //   const allTexts = await page
  //     .locator("//input[@id='input-search']/following-sibling::div/div/div/h5")
  //     .allTextContents();
  //   console.log(allTexts);
});

test("Issues with METHODS USED ON A DYNAMIC LIST OF ELEMENTS (Dynamically loading website) & its solutions", async ({
  page,
}) => {

  //? Rahul Shetty Udemy
  await page.goto("https://rahulshettyacademy.com/client"); //dyanamically loading website
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator('//input[@id="login"]').click();

  //-----------------------------------------------------------------------------------------------------

  //* 🤑🤑🤑 SOLUTIONS TO THE ISSUE 🤑🤑🤑:
  // await page.waitForLoadState("networkidle", { timeout: 10000 }); //! Solution 1
  // await page.locator(".card-body b").last().waitFor(); //! Solution 2

  //-----------------------------------------------------------------------------------------------------

  //all() method
  const allelements: Locator[] = await page.locator(".card-body b").all();
  console.log(allelements.length);

  //count() method
  const totalCount = await page.locator(".card-body b").count();
  console.log(totalCount);

  //allTextContents()
  const allTexts = await page.locator(".card-body b").allTextContents();
  console.log(allTexts);

  //allInnerTexts()
  const allInnerTexts = await page.locator(".card-body b").allTextContents();
  console.log(allInnerTexts);
});


//! Also see:
//? tests\Locators\locator-misc.spec.ts (Locator & Auto-waitibilty concept)