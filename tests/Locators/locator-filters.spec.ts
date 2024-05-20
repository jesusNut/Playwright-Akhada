import { expect, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING FILTERS ☠️☠️
 
       ☠️ Filtering using text
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

  await page.getByRole("listitem").filter({ hasText: "Leave" }).click();
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

  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("link", { name: /My Leave/i }) })
    .click();
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
    .filter({hasNot: page.locator("//span")});

  console.log(await getNonDropDownElements.count());
  await expect(getNonDropDownElements).toHaveCount(4);
});
