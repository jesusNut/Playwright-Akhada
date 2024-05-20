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

test("Assertions for select dropdown", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  await page.waitForTimeout(4000);

  //! 1. print and verify number of options in Month Dropdown - approach 1

  const countOfOptions = await page
    .getByPlaceholder("Month")
    .locator("//option")
    .count();
  console.log(countOfOptions);
  expect(countOfOptions).toBe(13);
  expect(countOfOptions).toEqual(13);

  //! 2. Verify number of options in Month Dropdown - approach 2

  const monthDropdown = page.getByPlaceholder("Month").locator("//option");
  await expect(monthDropdown).toHaveCount(13);

  //! 3. Check presence of an option in the dropdown list

  const allOptions = await page.getByPlaceholder("Month").textContent();

  // expect(allOptions).toContain("July"); //!apporach-1
  expect(allOptions?.includes("July")).toBeTruthy(); //! approach-2

  //! 4. Check ALL elements in a list is present in the dropdown list in same order.

  const allOptions2 = page.getByPlaceholder("Month").locator("//option");

  expect(await allOptions2.allTextContents()).toEqual([
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]);

  //! 5a. Check some elements in a list(i.e. a sublist) is present in the dropdown list. [using custom method]

  const allOptions1 = page.getByPlaceholder("Month").locator("//option");

  //custom function to check if an array contains a subset.
  const isSubsetIncluded = <T>(parentArray: Array<T>, subset: Array<T>) => {
    return subset.every((el) => {
      return parentArray.includes(el);
    });
  };

  expect(
    isSubsetIncluded(await allOptions1?.allTextContents(), ["July", "May"])
  ).toBeTruthy();

  //! 5b. Check some elements in a list (i.e. a sublist) is present in the dropdown list.[using arrayContaining() method]

  const allOptions3 = page.getByPlaceholder("Month").locator("//option");

  expect(await allOptions3.allTextContents()).toEqual(
    expect.arrayContaining([
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ])
  );
});
