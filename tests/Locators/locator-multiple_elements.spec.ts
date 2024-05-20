import { Locator, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  WORKING WITH MULTIPLE ELEMENTS FROM DOM  ☠️☠️
 *================================================================**/

//? https://www.youtube.com/watch?v=w7arNcTebVc&t=267s
//? https://www.youtube.com/watch?v=54OwsiRa_eE&t=933s
//? https://www.youtube.com/watch?v=V5eIsWi14Ok&t=167s

//! 🟩 APPROACH-1 using all() method

test("Fetching multiple elements and print text - all() method", async ({
  page,
}) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/data-list-filter-demo"
  );

  //! Usage of all() method to fetch an 'array' of elements denoted by a locator
  //? https://playwright.dev/docs/api/class-locator#locator-all

  //! 😤  locator.all() does not wait for elements to match the locator, and instead immediately returns whatever is present in the page.
  //! 😤 When the list of elements changes dynamically, locator.all() will produce unpredictable and flaky results.

  const allelements: Locator[] = await page
    .locator("//input[@id='input-search']/following-sibling::div/div/div/h5")
    .all();

  //get total number of elements
  console.log(`total number of elements are : ${allelements.length}`);

  //todo ✅✅✅ ALWAYS USE FOR-AWAIT-OF LOOP TO ITERATE ARRAY OF ELEMENTS IN PW ✅✅✅
  // iterate to get texts of each element in the array
  // for await (const iterator of allelements) {
  //   console.log(await iterator.textContent());
  // }

  //todo ⛔️⛔️⛔️ NEVER USE FOREACH method to iterate over ARRAYS of elements in PW ⛔️⛔️⛔️
  //? https://github.com/microsoft/playwright/issues/19943
  //? https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  // the below code will fail the test

  // allelements.forEach(async element => {
  //     console.log(await element.textContent());
  // });

  //todo ✅✅✅ USING MAP FUNCTION while resolving promise TO ITERATE ARRAY OF ELEMENTS IN PW ✅✅✅

  const allTexts = await Promise.all(
    allelements.map(async (element) => {
      return await element.textContent();
    })
  );

  console.log(allTexts);
});

//! 🟥 APPROACH-2 using $ and $$ (Old approach - DON'T USE)

test("Fetching multiple elements and print text - $ and $$ method", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");

  //? https://playwright.dev/docs/next/api/class-elementhandle#element-handle-query-selector

  //! 🧐 $ is used to find an element matching the specified selector.🧐
  //!   If no elements match the selector, returns null.

  const textbox = await page.$(
    '//input[@placeholder="Enter your git user name eg., ortonikc"]'
  );
  await textbox?.fill("ortonikc");

  const searchBtn = await page.$('//button[@id="search"]');
  await searchBtn?.click();

  //! 🧐 $$ : This method finds all elements matching the specified selector 🧐
  //!  If no elements match the selector, returns empty array.
  //!  Auto- Awaitibility is not applicable on $$. That is why line no. 84 Is needed

  //? https://playwright.dev/docs/next/api/class-elementhandle#element-handle-wait-for-selector
  //! 🧐 waitForSelector()[⚠️DEPRICATED⚠️] will make sure that all elements are properly 'Visible' before doing anything on it.
  await page.waitForSelector(
    '//div[@class="block"]//div[@class="block"]/div/ol/li/a'
  );

  const allrepos_loc = await page.$$(
    '//div[@class="block"]//div[@class="block"]/div/ol/li/a'
  );

  //if no line no. 84, then the below code will give length as 0 because Auto- Awaitibility is not applicable on $$.
  console.log(allrepos_loc.length);

  //! 🧐 using for-await-of to loop
  // for await (const iterator of allrepos_loc) {
  //   console.log(await iterator.textContent());
  // }

  //! 🧐 Using map function to loop

  const allURLS = await Promise.all(
    allrepos_loc.map(async (locator) => {
      return await locator.textContent();
    })
  );

  console.log(allURLS);
});

test("Understanding first(), last() and nth() methods", async ({ page }) => {
  
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
});
