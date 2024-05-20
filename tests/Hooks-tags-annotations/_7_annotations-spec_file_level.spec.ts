import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING ANNOTATIONS written on spec-file level ☠️☠️

  //? https://playwright.dev/docs/api/class-test#methods
 *================================================================**/

// 🐼🐼🐼 Practice below annotations on spec-file level 🐼🐼🐼
//! 🐼 test.describe.configure()
//! 🐼 test.fail(callback, description),test.fail(callback)
//! 🐼 test.fixme(callback), test.fixme(callback, description)
//! 🐼 test.skip(callback), test.skip(callback, description)
//! 🐼 test.slow(callback), test.slow(callback,description)
//! 🐼 test.use()
//?    https://playwright.dev/docs/api/class-test#test-use
//?    https://playwright.dev/docs/api/class-testoptions

//---------------------------------------------------------------------------------------------------------

// test.fail(({ browserName }) => {
//   return browserName === "chromium";
// }, `All tests in this file should fail for firefox`);
// test.fixme(({ browserName }) => {
//   return browserName === "chromium";
// });
// test.skip(({ browserName }) => {
//   return browserName === "firefox";
// });
// test.slow(({ browserName }) => {
//   return browserName === "chromium";
// });

//---------------------------------------------------------------------------------------------------------
//! 🦗 before each hook 🦗

test.beforeEach(async () => {
  console.log("I am before each");
});

//! 🦗 after each hook 🦗

test.afterEach(async () => {
  console.log("I am after each");
});

//! 🦗 before all hook 🦗

test.beforeAll(async () => {
  console.log("I am before all");
});

//! 🦗 after all hook 🦗

test.afterAll(async () => {
  console.log("I am after all");
});

//-----------------------------------------------------------------------------------------------------------------

test("TEST-1", async () => {
  console.log("I am test - 1");
});

test("TEST-2", async () => {
  console.log("I am test - 2");
});

test("TEST-3", async () => {
  console.log("I am test - 3");
});

test("TEST-4", async () => {
  console.log("I am test - 4");
});

test("A slow test", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");
  const checkbox = page.locator('//input[@id="dte"]');
  await expect(checkbox).toBeDisabled();
  await page.locator('//button[normalize-space()="Check this"]').click();
  //after 10s, the checkbox will be enabled.
  await checkbox.check();
  if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
});

//! ---------------------------------- 🌽🌽🌽 SPECIAL CASE 🌽🌽🌽-----------------------------------------------------

//* Run multiple describes in parallel, but tests inside each describe in order.

// test.describe.configure({mode: 'parallel'});

// test.describe("Second describe block", () => {
//   test.describe.configure({mode: 'serial'});
//   test("d", async () => {
//     console.log(`I am test 8`);
//   });
//   test("c", async () => {
//     console.log(`I am test 7`);
//   });
//   test("b", async () => {
//     console.log(`I am test 6`);
//   });
//   test("a", async () => {
//     console.log(`I am test 5`);
//   });

//   //! 🦗 before each hook 🦗

//   test.beforeEach(async () => {
//     console.log("I am before each");
//   });

//   //! 🦗 after each hook 🦗

//   test.afterEach(async () => {
//     console.log("I am after each");
//   });

//   //! 🦗 before all hook 🦗

//   test.beforeAll(async () => {
//     console.log("I am before all");
//   });

//   //! 🦗 after all hook 🦗

//   test.afterAll(async () => {
//     console.log("I am after all");
//   });
// });

// test.describe("First describe block", () => {
//   test.describe.configure({mode: 'serial'});
//   test("Test-1", async () => {
//     console.log(`I am test 1`);
//   });

//   test("Test-2", async () => {
//     console.log(`I am test 2`);
//   });
//   test("Test-3", async () => {
//     console.log(`I am test 3`);
//   });
//   test("Test-4", async () => {
//     console.log(`I am test 4`);
//   });

//   //! 🦗 before each hook 🦗

//   test.beforeEach(async () => {
//     console.log("I am before each");
//   });

//   //! 🦗 after each hook 🦗

//   test.afterEach(async () => {
//     console.log("I am after each");
//   });

//   //! 🦗 before all hook 🦗

//   test.beforeAll(async () => {
//     console.log("I am before all");
//   });

//   //! 🦗 after all hook 🦗

//   test.afterAll(async () => {
//     console.log("I am after all");
//   });
// });
