import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING HOOKS ☠️☠️

 //? https://playwright.dev/docs/api/class-test#methods
 //?https://www.youtube.com/watch?v=qjR02QLDz0w&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=13
 //? Vignesh-Udemy (for all topics of Hooks-tags-annotations)
 *================================================================**/

//todo: 🍁🍁🍁🍁🍁🍁   Point to remember 🍁🍁🍁🍁🍁🍁
//todo: Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
//todo: If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
//todo: If you would like to configure your page before each test, do that in beforeEach hook instead.

//*----------------------------------------------------------------------

//🍁🍁🍁 Observe the pattern in which logs gets printed in console. 🍁🍁🍁

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

//* Understanding different types of hooks
//*----------------------------------------------------------------------

test("TEST-1", async () => {
  console.log("I am test - 1");
});

test("TEST-2", async () => {
  console.log("I am test - 2");
});
