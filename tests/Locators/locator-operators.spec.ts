import { expect, test } from "@playwright/test";

/**================================================================================================================
 *!    ☠️☠️  UNDERSTANDING LOCATOR OPERATIONS ☠️☠️
 
       ☠️ Matching inside a locator (Narrowing down)
       ☠️ NARROWING DOWN VS FILTER CONCEPT
       ☠️ Matching two locators simultaneously
       ☠️ Matching one of the two alternative locators
 *=================================================================================================================**/

test("Matching inside a locator (Narrowing down)", async ({ page }) => {
  //! We can chain locators to narrow down the search to a particular part of the page.

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

  //find the topbar menu
  const topbar_menu = page.getByRole("navigation", { name: "Topbar Menu" });
  //find all list items inside the topbar menu component in the DOM
  const alllistitems = topbar_menu.getByRole("listitem");
  //find & print the count of all list items inside topbar menu component
  console.log(await alllistitems.count());
});

test("NARROWING DOWN VS FILTER CONCEPT", async ({ page }) => {
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

  //! ALWAYS REMEMBER : Narrowing down a specific part of page/locator is different from FILTER concept.

  //find the topbar menu-> and then find the count of all li tags (listitem) inside it by narrowing & then by filtering.
  const topbar_menu = page.getByRole("navigation", { name: "Topbar Menu" });
  const alllistitems = topbar_menu.getByRole("listitem");
  const countFromNarrowing = await alllistitems.count();
  console.log(`Count using Narrowing method is : ${countFromNarrowing}`); //Count using Narrowing method is : 7

  //! --------------------------------------------------------------------------------------------------

  const countFromFilter = await topbar_menu
    .filter({
      has: page.getByRole("listitem"),
    })
    .count();
  console.log(`Count using filter method is : ${countFromFilter}`); //Count using filter method is : 1

  //! Since, we have a single Topbar menu, we thought that it will be narrowed down to find all listitems using filter.
  //! BUT THIS IS WRONG.
  //! 🥶 Filter is always used to FILTER from a GROUP of ELEMENTS.🥶
  //! Here we are tyring to filter  a single element called 'topbar_menu' thinking that it can narrow down which is wrong assumption.
  //!

  //!CORRECT USAGE OF FILTERS : TO SELECT FROM A GROUP/LIST OF ELEMENTS.

  //lets say we want to filter all li tags (listitem) which has dropdown in them and print their count from topbar menu.

  const listhavingdropdowns = await topbar_menu
    .getByRole("listitem")
    .filter({ has: page.locator("//span") })
    .count();

  console.log(
    `No. of listitems/li tags having dropdown is ${listhavingdropdowns}`
  );
});

/**================================================================================================================
 *!    ☠️☠️ KEY TAKEAWAYS OF NARROWING DOWN VS FILTER CONCEPT☠️☠️

 ** 1. When we have to drill down an element to find inner elements-> USE concept of Matching inside a locator (Narrowing down).

 ** 2. When we have a group/list of elements and we want to select/filter from that group/list-> USE FILTERS
 *=================================================================================================================**/

test("Matching two locators simultaneously", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //! we want to locate a web element by combining 2 locator strategies.

  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .and(page.getByPlaceholder(/username/i))
    .fill("Admin");

  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
});

test("Matching one of the two alternative locators", async ({ page }) => {
  //For example, consider a scenario where you'd like to click on a "New email" button,
  // but sometimes a security settings dialog shows up instead.
  // In this case, you can wait for either a "New email" button, or a dialog and act accordingly.
  //todo BELOW CODE IS SAMPLE CODE:

  const newEmail = page.getByRole("button", { name: "New" });
  const dialog = page.getByText("Confirm security settings");
  await expect(newEmail.or(dialog).first()).toBeVisible();
  if (await dialog.isVisible())
    await page.getByRole("button", { name: "Dismiss" }).click();
  await newEmail.click();
});


