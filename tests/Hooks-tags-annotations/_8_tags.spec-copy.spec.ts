import { test } from "@playwright/test";

/**=========================================================================
 *!    ☠️☠️  UNDERSTANDING TAGS & USING IT USING CONFIG FILE & CMD ☠️☠️

 //todo::  this file is to be used with 'tests\Hooks-tags-annotations\_8_tags.spec.ts'
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

test.describe('c describe block', () => {

  test("TEST-100 @smoke", async () => {
    console.log("I am test - 100");
  });
  
  test("TEST-200 @sanity", async () => {
    console.log("I am test - 200");
  });
  
  test("TEST-300 @reg", async () => {
    console.log("I am test - 300");
  });

  
})


test.describe("d describe block", () => {
  test("dog @ui", async () => {
    console.log(`I am test d`);

  });
  test("cat @api", async () => {
    console.log(`I am test c`);
  });
});

