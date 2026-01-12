import { expect, test } from "@playwright/test";

/**==================================================================
 *!    ☠️☠️  HANDLING SELECT DROPDOWN ☠️☠️
 *================================================================**/

//? https://www.youtube.com/watch?v=q22nB3-tpU4&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=19
//? https://www.youtube.com/watch?v=Jw8d2Q_x3Qo&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=11 [for assertions]
//? https://www.youtube.com/watch?v=om4GCJ20fq8&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=12 [for assertions]

test("Single Select dropdown", async ({ page }) => {
  const selectDropdown = page.locator("#Skills");

  await page.goto("https://demo.automationtesting.in/Register.html");

  //selecting by value - way 1
  await selectDropdown.selectOption("Backup Management");
  await page.waitForTimeout(3000);

  //selecting by value - way 2
  await selectDropdown.selectOption({ value: "AutoCAD" });
  await page.waitForTimeout(3000);

  //selecting by visible text (if label attribute not possible)/label
  await selectDropdown.selectOption({ label: "Client Server" });
  await page.waitForTimeout(3000);

  //selecting by index [zero-based]
  await selectDropdown.selectOption({ index: 20 });
  await page.waitForTimeout(3000);
});

test("Multi Select dropdown_1", async ({ page }) => {
  const multiSelectDropdown = page
    .getByRole("listbox")
    .and(page.locator("//select[@id='second']"));

  await page.goto(
    "https://chercher.tech/practice/practice-dropdowns-selenium-webdriver"
  );

  //passing array of values - way 1
  await multiSelectDropdown.selectOption(["donut", "burger", "bonda"]);
  await page.waitForTimeout(1200);

  await page.reload();

  //passing array of values - way 2
  if (await multiSelectDropdown.isVisible())
    await multiSelectDropdown.selectOption([
      { value: "donut" },
      { value: "bonda" },
    ]);
});

test("Multi Select dropdown_2", async ({ page }) => {
  const multiSelectDropdown = page
    .getByRole("listbox")
    .and(page.locator("//select[@id='second']"));

  await page.goto(
    "https://chercher.tech/practice/practice-dropdowns-selenium-webdriver"
  );

  //passing array of indexes
  await multiSelectDropdown.selectOption([
    { index: 0 },
    { index: 1 },
    { index: 2 },
  ]);
  await page.waitForTimeout(3000);
});

test("Multi Select dropdown_3", async ({ page }) => {
  const multiSelectDropdown = page
    .getByRole("listbox")
    .and(page.locator("//select[@id='ide']"));

  await page.goto(
    "https://www.hyrtutorials.com/p/html-dropdown-elements-practice.html"
  );

  //passing array of label/visible texts(if label is not present)
  await multiSelectDropdown.selectOption([
    { label: "IntelliJ IDEA" },
    { label: "NetBeans" },
  ]);
  await page.waitForTimeout(3000);
});

test("Multi Select dropdown_4", async ({ page }) => {
  await page.goto(
    "https://chercher.tech/practice/practice-dropdowns-selenium-webdriver"
  );

  const dropdown = page.locator("//select[@id='second']");

  //passing array of indexes, labels and values in a single go.
  await dropdown.selectOption([
    { index: 0 },
    { label: "Donut" },
    { value: "bonda" },
  ]);
  await page.waitForTimeout(2000);
});

test("Assertions for select dropdown- 1", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  await page.waitForTimeout(4000);

  //! 1a. print and verify number of options in Month Dropdown - approach 1

  const countOfOptions = await page
    .getByPlaceholder("Month")
    .locator("//option")
    .count();
  console.log(countOfOptions);
  expect(countOfOptions).toBe(13);
  expect(countOfOptions).toEqual(13);

  //! 1b. Verify number of options in Month Dropdown - approach 2 :: Web-first assertion.

  const monthDropdown = page.getByPlaceholder("Month").locator("//option");
  await expect(monthDropdown).toHaveCount(13);
});

test("Assertions for select dropdown- 2", async ({ page }) => {
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! ☠️ 2a. Check presence of an option in the dropdown list - web fist assertion

  //const tempEle = page.locator("#multiselect option").filter({hasText : 'Honda'}); //🤩 if text needs to be asserted - web first assertion
  const tempEle = page
    .locator("#multiselect")
    .locator("xpath=.//option[@value='honda']"); //🤩 if value needs to be asserted -- web first assertion
  await expect(tempEle).toHaveCount(1);

  //! ☠️ 2b. Check presence of an option in the dropdown list - NON web fist assertion

  const tempEle1 = await page.locator("#multiselect option").allTextContents();
  expect(tempEle1).toContainEqual("Honda"); //🤩 Non-web first asertion way!!!
});

test("Assertions for select dropdown- 3", async ({ page }) => {
  const expectedData = [
    "Volvo",
    "Maruti Suzuki",
    "Opel",
    "Audi",
    "Honda",
    "Hyundai",
  ];
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! 3a. Check ALL elements in a list is present in the dropdown list in same order.

  const actualStringArr = await page
    .locator("#multiselect option")
    .allTextContents();
  expect(actualStringArr.map((str) => str.trim())).toEqual(expectedData);
});

test("Assertions for select dropdown- 4", async ({ page }) => {
  const expectedData = ["Opel", "Audi"];
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! 4a. Check some elements in a list(i.e. a sublist) is present in the dropdown list in ANY ORDER. [using custom method]

  const actualStringArr = (
    await page.locator("#multiselect option").allTextContents()
  ).map((str) => str.trim());

  expect(
    expectedData.every((ele) => actualStringArr.includes(ele))
  ).toBeTruthy();

  //! 4b. Check some elements in a list (i.e. a sublist) is present in the dropdown list in ANY ORDER.[using arrayContaining() method]

  expect(actualStringArr).toEqual(expect.arrayContaining(expectedData));
});

test("Assertions for select dropdown- 5", async ({ page }) => {
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! 5. Validate the options once they are selected in a multiselect dropdown.

  const dd = page.locator("#multiselect");
  //select "Opel" and "Maruti Suzuki".
  await dd.selectOption(["Opel", "Maruti Suzuki"]);
  await page.waitForTimeout(2000);
  //validate "Opel" and "Maruti Suzuki" are indeed selected.
  await expect(dd).toHaveValues(["suzuki", "opel"]);
  //!☠️ note 1: toHaveValues() asserts option 'VALUEs' and not label/visibe text and must be awaited;
  //!☠️ note 2: Playwright expects the array of values to match the order of the selected options in the DOM
  //!   (which is almost always the order they appear from top to bottom in the dropdown).so thsi will fail : await expect(dd).toHaveValues(["opel", "suzuki"]);
});

test("Assertions for select dropdown- 6", async ({ page }) => {
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! 6. Validate the options once they are selected in a multiselect dropdown.- FIXING ISSUE WITH NOTE 2 in example 5

  const dd = page.locator("#multiselect");

  //select "Opel" and "Maruti Suzuki".
  await dd.selectOption(["Opel", "Maruti Suzuki"]);
  await page.waitForTimeout(2000);

  const actualArr = await dd.evaluate((dd) => {
    const data = dd as HTMLSelectElement;
    return Array.from(data.selectedOptions).map((ele) => ele.value);
  });

  //validate "Opel" and "Maruti Suzuki" are indeed selected.
  expect(actualArr.sort()).toEqual(["opel", "suzuki"].sort());

});

test("Assertions for select dropdown- 7", async ({ page }) => {
  await page.goto("https://techcanvass.com/Examples/multi-select.html");

  //! 7. Validate whether a single option selected in a single/multi select dropdown after selection.

  const dd = page.locator("#multiselect");

  // select "Opel"
  await dd.selectOption("Opel");

  // validate "Opel" is indeed selected
  await expect(dd).toHaveValue("opel");

  //! ☠️ toHaveValue() / toHaveValues() assertions validate the option’s VALUE attribute -'opel', not the visible text (label) - 'Opel'.Notice case.
});