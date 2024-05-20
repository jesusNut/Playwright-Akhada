import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING BOOTSTRAP DROPDOWN  ☠️☠️
 *================================================================**/

test("Bootstrap dropdown : example 1", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");

  await page.locator("//span[@role='combobox']").click();
  await page
    .locator("//ul[@id='select2-country-results']")
    .locator("li")
    .filter({ hasText: "Netherlands" })
    .click();
});

test("Bootstrap dropdown : example 2", async ({ page }) => {
  await page.goto(
    "https://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html"
  );

  await page.locator("//button[@id='menu1']").click();
  await page.waitForTimeout(3000);
  await page
    .locator("//ul[@role='menu']")
    .locator("li")
    .filter({ hasText: "JavaScript" })
    .click();

  await page.waitForTimeout(3000);
});

test("Bootstrap dropdown : example 3", async ({ page }) => {
  await page.goto("http://autopract.com/selenium/dropdown4/");

  await page.locator("//button[@title='Afghanistan']").click();
  await page.waitForTimeout(2000);
  await page
    .locator("//ul[@role='listbox']")
    .locator("li")
    .filter({ hasText: /Cocos/i })
    .click();

  await page.waitForTimeout(3000);
});

test("Bootstrap dropdown : example 4 with assertions", async ({ page }) => {
  await page.goto("https://jquery-az.com/boots/demo.php?ex=63.0_2");

  await page.locator("//button[@title='HTML, CSS']").click();

  //print all options and check if they are 11 in number
  const allOptions = await page
    .locator("//ul[@class='multiselect-container dropdown-menu']/li//input")
    .all();

  for (const iterator of allOptions) {
    console.log(await iterator.getAttribute("value"));
  }

  expect(allOptions.length).toBe(11);

  //select 3 options - angular, java and oracle [way 1]

  const valuesToBeSelected = ["Java", "Angular", "Oracle"];

  for (const iterator of allOptions) {
    const valueofValueAttribue = await iterator.getAttribute("value");

    if (
      valueofValueAttribue == valuesToBeSelected[0] ||
      valueofValueAttribue == valuesToBeSelected[1] ||
      valueofValueAttribue == valuesToBeSelected[2]
    ) {
      await iterator.click();
    }
  }
});
