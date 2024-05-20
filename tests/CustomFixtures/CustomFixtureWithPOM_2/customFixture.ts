import { test as baseTest } from "@playwright/test";
import { GoogleMainPage, PrivacyPage } from "./pageClasses";

//! 1. 💰 We can use other predefined fixtures (that are present in '@playwright/test' like page, browser, context etc.) directly
//!       as the first argument of the async() method. But make sure below:

//===========================================================================================================================
//! 👉👉👉 If the type of any of the property is 'any' type, then while implementing that fixture using an async function
//! in the extend method, the pre-defined fixtures like page, browser, context etc. will not work. 👈👈👈
//===========================================================================================================================

type Myfixtures = {
  fixture1: GoogleMainPage; //if here the type is 'any', then predefined fixtures cannot be used as the first argument of the use() method
  fixture2: PrivacyPage;
};

export const test = baseTest.extend<Myfixtures>({
  
  fixture1: async ({ page }, use) => {
    console.log("I am printing before using the fixture1");
    await use(new GoogleMainPage(page));
    console.log("I am printing after using the fixture1");
  },
  fixture2: async ({ page }, use) => {
    console.log("I am printing before using the fixture2");
    await use(new PrivacyPage(page));
    console.log("I am printing after using the fixture2");
  },
});
