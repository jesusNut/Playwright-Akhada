import { test, expect, Page } from "@playwright/test";

/**========================================================================
 *!    ☠️☠️  HANDLING  WEB TABLES and PAGINTATION TABLES☠️☠️
 *=========================================================================**/

test("Handling webtables- example 1", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //! finding total number of columns and rows

  const rows = await page
    .locator("//table[@name='BookTable']/tbody/tr")
    .count();
  const columns = await page
    .locator("//table[@name='BookTable']/tbody/tr[1]/th")
    .count();
  console.log(`Total number of rows are : ${rows}`);
  console.log(`Total number of columns are : ${columns}`);

  expect(rows).toBe(7);
  expect(columns).toBe(4);
});

test("Selecting single check box on first page of a pagination table -1", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //product name whose checkbox needs to be clicked

  const productToCheck = "Product 3";

  //find the tr which has a 'td with text -Product 3'

  const locator = page
    .locator("//table[@id='productTable']/tbody/tr")
    .filter({ has: page.locator("td") })
    .filter({ hasText: productToCheck });

  //click the checkbox once the 'Product 3' is identified.

  await locator.locator("td").last().locator("input").check();
});

test("Selecting single check box on first page of a pagination table -2", async ({
  page,
}) => {
   await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
  );

  const expectedVal= "Smartwatch";
  const parent = page.locator("//table[@id='productTable']/tbody/tr");

  await parent
    .locator("xpath = ./td[2]")
    .filter({ hasText: `${expectedVal}` })
    .locator("xpath = ./following-sibling::td/input")
    .click();
});

test("Selecting multiple check boxes on first page of a pagination table", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //product nameS whose checkbox needs to be clicked.

  const productToCheck = ["Product 3", "Product 2", "Product 5"];

  for (const iterator of productToCheck) {
    await selectCheckboxForProduct(page, iterator);
  }

  //! Generic function to select multiple checkboxes

  async function selectCheckboxForProduct(page: Page, productName: string) {
    const locator = page
      .locator("//table[@id='productTable']/tbody/tr")
      .filter({ has: page.locator("td") })
      .filter({ hasText: productName });

    await locator.locator("td").last().locator("input").check();
  }
});

test("Printing all data on first page of a pagination table ", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //get and iterate over rows

  const allRows = await page
    .locator("//table[@id='productTable']/tbody/tr")
    .all();

  for (const iterator of allRows) {
    const allColumns = await iterator.locator("td").all();

    //get and iterate over columns

    for (const iterator of allColumns) {
      const cellData: string | null = await iterator.textContent();
      console.log(cellData);
    }
  }
});

test("Printing all data on ALL pages of a pagination table ", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //get locator for pagination

  const paginationLocator = page.locator("//ul[@id='pagination']/li/a");
  const allPaginations = await paginationLocator.all();

  await printallData();

  async function printallData() {
    for (let index = 0; index < allPaginations.length; index++) {
      //dont click on first page of pagination
      if (index > 0) {
        await paginationLocator.nth(index).click();
      }

      //get all rows for that pagination and iterate over those rows.

      const allRows = await page
        .locator("//table[@id='productTable']/tbody/tr")
        .all();

      for (const iterator of allRows) {
        const allColumns = await iterator.locator("td").all();

        //get and iterate over columns

        for (const coliterator of allColumns) {
          const cellData: string | null = await coliterator.textContent();
          console.log(cellData);
        }
      }
    }
  }
});
test("Selecting data on any page in webtable with pagination", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
  );

  const paginationAnchors = page
    .locator("//ul[@id='pagination']/li/a");

  const paginationCount = await paginationAnchors.count();

  for (let i = 0; i < paginationCount; i++) {
    const parent = page
      .locator("//table[@id='productTable']/tbody/tr/td[2]")
      .filter({ hasText: "Wireless Mouse 20" });

    if ((await parent.count()) > 0) {
      await parent.locator("xpath = ./following-sibling::td/input").click();
      break;
    }

  // move to NEXT page only if not on last page
  if (i < paginationCount - 1) {
    await paginationAnchors.nth(i + 1).click();
  }
    
  }
});