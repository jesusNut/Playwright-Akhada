import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING ANNOTATIONS with DESCRIBE BLOCK ☠️☠️

  //? https://playwright.dev/docs/api/class-test#methods
 *================================================================**/

// 🐼🐼🐼 Practice below annotations 🐼🐼🐼
//! 🐼 test.describe.configure() - [⚠️Can be executed either on the top level or inside a describe block⚠️]
//! 🐼 test.describe.only()
//! 🐼 test.describe.fixme() - all variants
//! 🐼 test.describe.skip() - all variants
//! 🐼 test.fixme(callback), test.fixme(callback, description)
//! 🐼 test.skip(callback), test.skip(callback, description)
//! 🐼 test.slow(callback), test.slow(callback,description)
//! 🐼 test.fail(callback), test.fail(callback, description)

//---------------------------------------------------HOOKS--------------------------------------------------------

//* Run all tests inside the below describe block in parallel using test.describe.configure()
// test.describe("Understanding config with parallel", () => {
//   test.describe.configure({ mode: "parallel" });
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

//* Run all tests inside the below describe block with custom timeout using test.describe.configure()
// test.describe("Understanding config with custom timeout", () => {
//   test.describe.configure({ timeout: 12000 });
//   test("A test which pass on timeout > 14000", async ({ page }) => {
//     await page.goto("http://omayo.blogspot.com/");
//     const checkbox = page.locator('//input[@id="dte"]');
//     await expect(checkbox).toBeDisabled();
//     await page.locator('//button[normalize-space()="Check this"]').click();
//     //after 10s, the checkbox will be enabled.
//     await checkbox.check();
//     if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
//   });
// });

//*using  test.describe.fixme(): The 4 tests inside the below describe won't run.[WAY-1]
// test.describe.fixme("Understanding test.describe.fixme(title, callback)", () => {
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

//*using  test.describe.fixme(): The 4 tests inside the below describe won't run. [WAY-2]
//* Notice, I haven't used any title for the below describe block to demo - test.describe.fixme(callback)
// test.describe.fixme(() => {
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

//*using  test.fixme(callback): The 4 tests inside the below describe won't run for firefox.
// test.describe("Understanding test.fixme(callback) inside describe() block", () => {

// test.fixme(({browserName})=>{
//   return browserName === 'firefox';
// })

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

//*using test.describe.only()
// test.describe.only("Understanding test.describe.only()", () => {
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

//*using  test.describe.skip(): The 4 tests inside the below describe won't run.[WAY-1]
// test.describe.skip("Understanding test.describe.skip(title, callback)", () => {
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

//*using  test.describe.skip(): The 4 tests inside the below describe won't run. [WAY-2]
//* Notice, I haven't used any title for the below describe block to demo - test.describe.skip(callback)
// test.describe.skip(() => {
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

//*using  test.skip(callback): The 4 tests inside the below describe won't run for firefox.
// test.describe("Understanding test.skip(callback) inside describe() block", () => {

// test.skip(({browserName})=>{
//   return browserName === 'firefox';
// })

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

// //*using  test.slow(callback, description) - Mark all tests in a test.describe() group as "slow" based on some condition by passing a callback
// test.describe("Understanding test.slow(callback) inside describe() block", () => {
//   test.slow(({ browserName }) => {
//     return browserName === "firefox";
//   }, "all firefox tests are slow for this describe block");

//   test("A slow test", async ({ page }) => {
//     await page.goto("http://omayo.blogspot.com/");
//     const checkbox = page.locator('//input[@id="dte"]');
//     await expect(checkbox).toBeDisabled();
//     await page.locator('//button[normalize-space()="Check this"]').click();
//     //after 10s, the checkbox will be enabled.
//     await checkbox.check();
//     if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
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

//*using  test.fail(callback) : Mark all tests in a test.describe() group as "should fail" based on some condition with a single test.fail(callback, description) call.
 test.describe("Understanding test.skip(callback) inside describe() block", () => {

test.fail(({browserName})=>{
  return browserName === 'firefox';
}, 'tests in this describe block should fail as not implemented for firefox yet')

  test("Test-1", async () => {
    console.log(`I am test 1`);
    expect(true).toBeFalsy();
  });

  test("Test-2", async () => {
    console.log(`I am test 2`);
  });
  test("Test-3", async () => {
    console.log(`I am test 3`);
    expect(true).toBeFalsy();
  });
  test("Test-4", async () => {
    console.log(`I am test 4`);
  });

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
});
