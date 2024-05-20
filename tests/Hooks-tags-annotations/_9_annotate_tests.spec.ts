import { test, expect } from "@playwright/test";

/**=========================================================================
 *!    ☠️☠️  UNDERSTANDING HOW TO ANNOTATE TESTS ☠️☠️

//* 🐭 Annotation is a way of adding some extra information in to the test.
//* If you would like to annotate your tests with something more substantial than a tag, 
//* 🤘 a. you can do that when declaring a test.
//* 🤘 b. during runtime.
//? https://playwright.dev/docs/test-annotations#annotate-tests
//? https://playwright.dev/docs/test-annotations#runtime-annotations
*=========================================================================**/

test(
  "Annotate this test at time of declaration",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/xxxx",
    },
  },
  async ({ page }) => {
    await page.goto("http://omayo.blogspot.com/");
    const checkbox = page.locator('//input[@id="dte"]');
    await expect(checkbox).toBeDisabled();
    await page.locator('//button[normalize-space()="Check this"]').click();
    //after 10s, the checkbox will be enabled.
    await checkbox.check();
    if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
  }
);

test(
  "Multiple annotations at time of declaration of a test",
  {
    annotation: [
      {
        type: "issue",
        description: "https://github.com/microsoft/playwright/issues/xxxx",
      },
      {
        type: "performance",
        description: "This is a very slow test.",
      },
    ],
  },
  async ({ page }) => {
    await page.goto("http://omayo.blogspot.com/");
    const checkbox = page.locator('//input[@id="dte"]');
    await expect(checkbox).toBeDisabled();
    await page.locator('//button[normalize-space()="Check this"]').click();
    //after 10s, the checkbox will be enabled.
    await checkbox.check();
    if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
  }
);

test.describe(
  "Annotate describe block",
  { annotation: { type: "group", description: "All simple tests" } },
  () => {
    test(
      "TEST-1",
      {
        annotation: {
          type: "song while coding",
          description: "Not funny- Madgaon Express",
        },
      },
      async () => {
        console.log("I am test - 1");
      }
    );

    test("TEST-2", async () => {
      console.log("I am test - 2");
    });

    test("TEST-3", async () => {
      console.log("I am test - 3");
    });
  }
);

test("Annotate this test at Runtime", async ({ page, browser }) => {
  test.info().annotations.push({
    type: "browser version",
    description: browser.version(),
  });

  await page.goto("http://omayo.blogspot.com/");
  const checkbox = page.locator('//input[@id="dte"]');
  await expect(checkbox).toBeDisabled();
  await page.locator('//button[normalize-space()="Check this"]').click();
  //after 10s, the checkbox will be enabled.
  await checkbox.check();
  if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
});
