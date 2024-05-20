import { test } from "@playwright/test";

/**=========================================================================
 *!    ☠️☠️  UNDERSTANDING TAGS & USING IT USING CONFIG FILE & CMD ☠️☠️

//* 🐭 "Tag" refers to a label or identifier that is attached to a particular test. 
//* 🐭 Tags must start with @ symbol.
//* 🐭 - USAGE : a. tag your tests and then filter by tag in the test report. b. Only run tests that have a certain tag.

//* 🐭 There are 2 ways to declare tags - 
//* 1. add @-token to the test title [OLD Way]
//* 2. provide an additional details object when declaring a test [New Way]

//* We can command PW to run specific tests or group of tests based on tags both via UI and CMD- GREP

//* ⚠️⚠️⚠️ While running tests using tags, we can either target all tests in entire test suite(i.e all spec files in .tests folder)
//* OR we can also target tests in specific spec files.

//? https://playwright.dev/docs/test-annotations#tag-tests
//? https://www.youtube.com/watch?v=kTTK2qlefxw&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=41 [Part-1- run using CMD]
//? https://www.youtube.com/watch?v=24IxfcDWXXo&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=42 [Part-2- run using CMD]
//? https://www.youtube.com/watch?v=ZfTrdhKXAgo&t=399s [run using Config file]

//! CMD commands for 'bash' CMD:
//! npx playwright test --grep "@smoke" :: run all tests in entire .tests folder(i.e. in all spec files) with tag @smoke
//! npx playwright test _8_tags.spec.ts  --grep-invert "@smoke"  :: run all tests in '_8_tags.spec.ts' spec file with tags other than @smoke 
//! npx playwright test --grep "@smoke|@reg" :: run all tests in entire .tests folder(i.e. in all spec files) with tag EITHER @smoke OR @reg [Logical OR]
//! npx playwright test --grep "(?=.*smok)(?=.*reg)" :: run all tests in entire .tests folder(i.e. in all spec files) with tag @smoke && @reg [Logical AND]

*=========================================================================**/

// test("Old/first way to add tags @oldtag1 @oldtag2", async () => {
//   console.log(`I am old way to tag tests`);
// });

// test(
//   "New/second way to add tags",
//   { tag: ["@newtag1", "@newtag2"] },
//   async () => {
//     console.log(`I am new way to tag tests`);
//   }
// );

test.describe("b describe block", () => {
  test("TEST-1 @smoke", async () => {
    console.log("I am test - 1");
  });

  test("TEST-2 @sanity", async () => {
    console.log("I am test - 2");
  });

  test("TEST-3 @reg", async () => {
    console.log("I am test - 3");
  });

  test("TEST-4 @reg @smoke", async () => {
    console.log("I am test - 4");
  });
});

test.describe("a describe block", () => {
  test("d @ui @smoke", async () => {
    console.log(`I am test d`);
  });
  test("c @api @sanity", async () => {
    console.log(`I am test c`);
  });
  test("b @ui @api @reg @smoke", async () => {
    console.log(`I am test b`);
  });
});
