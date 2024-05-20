import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING ANNOTATIONS ☠️☠️

  //? https://playwright.dev/docs/api/class-test#methods
  //? https://www.youtube.com/watch?v=rIuYrdV4Eb4&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=12
 *================================================================**/

// 🐼🐼🐼 Practice below annotations 🐼🐼🐼
//! 🐼 test.skip() -
//!  🦔   a. declaring a test to be skipped,  skipping a test at runtime-conditionally & using callback functions
//!  🦔   b. skipping a test at runtime - test.skip();{write this inside the test block}
//!  🦔   c. skipping a test at runtime - conditionally - test.skip(condition, description); {write this inside the test block}
//!  🦔   d. skipping a test at runtime - using callback function -  test.skip(callback, description); 
//!         {write this inside ONLY ⚠️DESCRIBE⚠️ blocks or on spec file level}[covered in : tests\Hooks-tags-annotations\_6_Annotations-describe.spec.ts]

test("TEST-1", async () => {
  console.log("I am test - 1");
});

//! 🐼 test.skip() - declaring a test to be skipped
test.skip("TEST-2", async () => {
  console.log("I am test - 2");
});

//! 🐼 test.skip() - skipping a test at runtime
test("TEST-3", async () => {
  test.skip();
  console.log("I am test - 3");
});

//! 🐼 test.skip() - skipping a test at runtime-conditionally
//* If the browsername is 'firefox', then dont run the TC on Firefox
//* This test will fail due to assertion.
test("TEST-4", async ({ browserName }) => {
  test.skip(browserName === "chromium", `Don't run TC 4 in case of firefox`);
  console.log("I am test - 4");
  expect(true).toBeFalsy();
});

test("TEST-6", async () => {
  console.log("I am test - 6");
});

//---------------------------------------------------HOOKS--------------------------------------------------------

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


//--------------------------------------------------------------------------------------------------------

//-------------------------------⚠️⚠️⚠️⚠️----------------------------------
//! 🐼 test.skip() - skipping a test at runtime-using callback functions -
//If the title of test includes '5', then dont run the TC on Chrome
//* ⚠️test.skip() with callback can be used only in Describe block⚠️
//* ⚠️Below test will throw error : test.skip() with a function can only be called inside describe block ⚠️

// test("TEST-5", async () => {
//   test.skip(() => {
//     return test.info().title.includes("5");
//   }, `Don't run TC 4 in case of chrome`);
//   console.log("I am test - 5");
// });
//-------------------------------⚠️⚠️⚠️⚠️----------------------------------