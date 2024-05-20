import { test as BaseTest, Page, expect } from "@playwright/test";

//! Here, we are logging and logging out of each test case with the use of fixture (and not using before-each and after-each) bcoz
//! 💰 Fixtures are preffred over before and after hooks.

type CustomFixtures = {
  loginlogoutfixture: Page;
};

 const test = BaseTest.extend<CustomFixtures>({
  loginlogoutfixture: async ({ page }, use) => {

    //================== DO THIS BEFORE USING FIXTURE IN ACTUAL TC ====================
    await page.goto("https://www.saucedemo.com/");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

    //================== USE THE FIXTURE IN ACTUAL TC ====================
    await use(page);

    //================== DO THIS AFTER USING FIXTURE IN ACTUAL TC ====================
    await page.locator('//button[@id="react-burger-menu-btn"]').click();
    // await page.locator('//a[@id="inventory_sidebar_link"]').click();
    // await page.locator('//button[@id="react-burger-menu-btn"]').click();
    await page.locator('//a[@id="logout_sidebar_link"]').click();
    expect(page.url()).toContain("https://www.saucedemo.com");
  },
});


export default test;
export {expect} from '@playwright/test'