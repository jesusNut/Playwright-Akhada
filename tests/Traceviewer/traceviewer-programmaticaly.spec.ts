import { Locator, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️ SETTING TRACE PROGRAMMATICALLY IN TESTS  ☠️☠️
 *================================================================**/

test("Setting trace programmatically-1", async ({ page, context }) => {

  //! 1. Give command to start tracing.

  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();

  //get a list
  const listHolder: Locator = page
    .getByRole("navigation", { name: "Sidepanel" })
    .locator("//li/a/span");

  //fetch first element from a list and print
  console.log(await listHolder.first().textContent());

  //fetch last element from a list and print
  console.log(await listHolder.last().textContent());

  //fetch nth element from a list and print - (0) index based
  console.log(await listHolder.nth(1).textContent());

  //! 2. Give command to stop tracing.

  await context.tracing.stop({ path : 'traceme4.zip'});

});

test("Setting trace programmatically-2", async ({ page, context }) => {

    //! 1. Give command to start tracing.
  
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page
      .getByRole("textbox", { name: "Username", exact: true })
      .fill("Admin");
    await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
    await page.getByRole("button", { name: /login/i }).click();
  
    //get a list
    const listHolder: Locator = page
      .getByRole("navigation", { name: "Sidepanel" })
      .locator("//li/a/span");
  
    //fetch first element from a list and print
    console.log(await listHolder.first().textContent());
  
    //fetch last element from a list and print
    console.log(await listHolder.last().textContent());
  
    //fetch nth element from a list and print - (0) index based
    console.log(await listHolder.nth(1).textContent());
  
    //! 2. Give command to stop tracing.
  
    await context.tracing.stop({ path : 'traceme3.zip'});
  
  });
