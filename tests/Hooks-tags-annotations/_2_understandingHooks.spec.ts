import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING HOOKS WITH DESCRIBE BLOCK ☠️☠️

  //? https://playwright.dev/docs/api/class-test#methods
  //? https://www.youtube.com/watch?v=qjR02QLDz0w&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=13
 *================================================================**/

//* Understanding how hooks work with test.describe() blocks
//*-------------------------------------------------------------

//🍁🍁🍁 Observe the pattern in which logs gets printed in console & the HTML report . 🍁🍁🍁

test.describe("First Group", () => {

    //! 🦗 before each hook 🦗

test.beforeEach(async () => {
    console.log("I am before each - group -1");
  });
  
  //! 🦗 after each hook 🦗
  
  test.afterEach(async () => {
    console.log("I am after each - group -1");
  });
  
  //! 🦗 before all hook 🦗
  
  test.beforeAll(async () => {
    console.log("I am before all - group -1");
  });
  
  //! 🦗 after all hook 🦗
  
  test.afterAll(async () => {
    console.log("I am after all - group -1");
  });
  
  test("TEST-1", async () => {
    console.log("I am test - 1");
  });

  test("TEST-2", async () => {
    console.log("I am test - 2");
  });
});

test.describe("Second Group", () => {

    //! 🦗 before each hook 🦗

test.beforeEach(async () => {
    console.log("I am before each - group -2");
  });
  
  //! 🦗 after each hook 🦗
  
  test.afterEach(async () => {
    console.log("I am after each - group -2");
  });
  
  //! 🦗 before all hook 🦗
  
  test.beforeAll(async () => {
    console.log("I am before all - group -2");
  });
  
  //! 🦗 after all hook 🦗
  
  test.afterAll(async () => {
    console.log("I am after all - group -2");
  });
  
  test("TEST-3", async () => {
    console.log("I am test - 3");
  });

  test("TEST-4", async () => {

    //! this test will fail
    console.log("I am test - 4");
    expect(false).toBeTruthy();
  });
});

test("TEST-5", async () => {
  console.log("I am test - 5");
});

test("TEST-6", async () => {
  console.log("I am test - 6");
});
