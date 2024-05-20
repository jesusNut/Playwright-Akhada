import { expect, test } from "@playwright/test";

/**================================================================
 *!    ☠️☠️  HANDLING RADIO BUTTONS ☠️☠️
 *================================================================**/

//? Udemy : Vignesh
//? https://www.youtube.com/watch?v=OkTu5Wg1vHM&list=PLBw1ubD1J1UgkIbyIpqAFnSp8fVJw5cRH&index=12 [Using click() method]

test("Radio-button- check() method with assertions", async ({ page }) => {
  const male_radiobutton = page.getByLabel("Male", { exact: true });
  const female_radiobutton = page.getByLabel("FeMale");

  await page.goto("https://demo.automationtesting.in/Register.html");

  //to check first that both radio buttons on page load are not selected by default
  //! way 1
  await expect(male_radiobutton).not.toBeChecked();
  await expect(female_radiobutton).not.toBeChecked();
  //! way 2
  expect(await male_radiobutton.isChecked()).toBeFalsy();
  expect(await female_radiobutton.isChecked()).toBeFalsy();

  //select male radio button and check if it is selected
  await male_radiobutton.check();
  expect(await male_radiobutton.isChecked()).toBeTruthy();
  expect(await female_radiobutton.isChecked()).toBeFalsy();

  await page.waitForTimeout(3000);

  //select female radio button and check if it is selected
  await female_radiobutton.check();
  expect(female_radiobutton.isChecked()).toBeTruthy();
  expect(await male_radiobutton.isChecked()).toBeFalsy();
});


test("Radio-button- click() method with assertions", async ({
  page,
}) => {
  await page.goto("https://demo.automationtesting.in/Register.html");

  const male = page.locator("//input[@value='Male']");
  const female = page.locator("//input[@value='FeMale']");

  await expect(male).not.toBeChecked();
  expect(await female.isChecked()).toBeFalsy();

  await male.click();
  await expect(male).toBeChecked();

  await page.waitForTimeout(3000);

  await female.click();
  expect(await female.isChecked()).toBeTruthy();
});