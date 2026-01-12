import { expect, test } from "@playwright/test";

/**===============================================================================================================
 *!    ☠️☠️  UNDERSTANDING FILTERS VS NARROWING ☠️☠️

        //todo : Filtering: pick all matching elements, then filter among them uinsg text/child;
        //todo  Find All elements → Filter → Match

        //* : Narrowing: start from a logical parent container and narrow down to the child element
        //*   You first locate a parent DOM element, and then find the child element inside that parent’s DOM subtree.

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

  //find the topbar menu-> and then find the count of all li tags (listitem) inside it by narrowing & then by filtering the submenu Assign Leave.

  let parentDom = page.getByRole("navigation", { name: /Topbar Menu/ });
  const child1Dom = parentDom.getByRole("listitem"); //! narrowing
  const countFromNarrowing = await child1Dom.count();
  console.log(`Count using Narrowing method is : ${countFromNarrowing}`);
  const targetedEle = child1Dom.filter({ hasText: /Assign Leave/ }); //!filtering
  await targetedEle.click();

  //! --------------------------------------------------------------------------------------------------

  await page.waitForURL(/.*assignLeave/, { waitUntil: "networkidle" });
  // In modern web apps (like the OrangeHRM demo), clicking a menu item often triggers a re-render of the entire header or navigation bar.
  // Even if the menu looks the same, the actual HTML elements in the browser's memory are destroyed and replaced with new ones.
  // By re-assigning parentDom = page.getByRole(...), you are telling Playwright to "look again" for the version of the menu that exists on the new page.
  parentDom = page.getByRole("navigation", { name: /Topbar Menu/ });
  const countFromFilter = await parentDom
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

  const listhavingdropdowns = await parentDom
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
  //todo : Both locators must point to the same element.

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
