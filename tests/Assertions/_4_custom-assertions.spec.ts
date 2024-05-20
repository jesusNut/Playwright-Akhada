import { test, expect } from "@playwright/test";

//? https://www.youtube.com/watch?v=Fs-nM747TY4&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc&index=18
//? https://www.youtube.com/watch?v=Fs-nM747TY4&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc&index=18
//? https://playwright.dev/docs/test-assertions#expectpoll
//? https://playwright.dev/docs/test-assertions#expecttopass

test("Custom assertions using expect.poll()", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");
  await page.locator('//button[normalize-space()="Try it"]').click();
  //expect(await page.locator('//button[@id="myBtn"]').isDisabled()).toBeTruthy(); //!🤙 this will fail without custom assertion

  //* 💪 writing a custom assertion using expect.poll

  await expect
    .poll(
      async () => {
        return await page.locator('//button[@id="myBtn"]').isDisabled();
      },
      { timeout: 5000 }
    )
    .toBeTruthy(); //*💪 This will pass
});

test("Custom assertions using expect.toPass()", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");

  await expect(async () => {
    console.log("I am trying !!!!!");
    const allLinksAsArray = await page
      .locator("//app-gitrepos//div//ol//li")
      .all();
      console.log(`Total links are : ${allLinksAsArray.length}`);
    expect(allLinksAsArray.length).toBe(30);
  }).toPass();
});
