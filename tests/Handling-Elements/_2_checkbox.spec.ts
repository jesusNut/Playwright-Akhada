import { expect, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING CHECKBOXES - check(), uncheck() & click() ☠️☠️
 *================================================================**/

 //? Vignesh-Udemy
 //? https://www.youtube.com/watch?v=OkTu5Wg1vHM&list=PLBw1ubD1J1UgkIbyIpqAFnSp8fVJw5cRH&index=12 [Using click() method]

test("Checkbox- check() & uncheck() methods with assertions", async ({
  page,
}) => {
  await page.goto("https://demo.automationtesting.in/Register.html");

  const cricket = page.locator("#checkbox1");
  const movies = page.locator("#checkbox2");
  const hockey = page.locator("#checkbox3");

  //validate that checkboxes are unchecked while initial page load.

  await expect(cricket).not.toBeChecked(); //! way 1
  expect(await movies.isChecked()).toBeFalsy(); //! way 2
  expect(await hockey.isChecked()).toBeFalsy(); //! way 2

  //check one by one and then verify if checked

  await cricket.check();
  await movies.check();
  await hockey.check();

  expect(await cricket.isChecked()).toBeTruthy();
  expect(await movies.isChecked()).toBeTruthy();
  expect(await hockey.isChecked()).toBeTruthy();

  //UNcheck one by one and then verify if unchecked

  await cricket.uncheck();
  await movies.uncheck();
  await hockey.uncheck();

  expect(await cricket.isChecked()).toBeFalsy();
  expect(await movies.isChecked()).toBeFalsy();
  expect(await hockey.isChecked()).toBeFalsy();
});

test("Checkbox - using click() method to check and uncheck", async ({
  page,
}) => {
  await page.goto("https://demo.automationtesting.in/Register.html");

  const cricket = page.locator("#checkbox1");
  const movies = page.locator("#checkbox2");
  const hockey = page.locator("#checkbox3");

  //! 🤪 using click() to check checkboxes

  await cricket.click();
  await movies.click();
  await hockey.click();

  await expect(cricket).toBeChecked();
  expect(await movies.isChecked()).toBeTruthy();
  expect(await hockey.isChecked()).toBeTruthy();

  await page.waitForTimeout(4000);

  //! 🤪 using click() to UNcheck checkboxes

  await cricket.click();
  await movies.click();
  await hockey.click();

  await expect(cricket).not.toBeChecked();
  expect(await movies.isChecked()).toBeFalsy();
  expect(await hockey.isChecked()).toBeFalsy();
});


