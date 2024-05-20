import { test as baseTest } from "@playwright/test";

//! 1. 💰 Use test.extend() method to create custom fixtures
//! 2. 💰 Fixtures can we used inside tests, before and after hooks also.
//! 3. 💰 Fixtures are mainly used with page object classes.
//! 4. 💰 Fixtures are preferred over before and after hooks.
//! 5. 💰 While implementing fixtures using extend method, we can provide value of fixture(assuming fixture to be a key) or we can provide
//!       an async function.
//! 6. 💰 The argument passed inside the use() method is passed to the tests/before hooks/after hooks (wherever that fixture is used)

//===========================================================================================================================
//! 👉👉👉 If the type of any of the property is 'any' type, then while implementing that fixture using an async function
//! in the extend method, the pre-defined fixtures like page, browser, context etc. will not work. 👈👈👈
//===========================================================================================================================

type Myfixtures = {
  fixture1: Array<string>;
  fixture2: number;
};

const test = baseTest.extend<Myfixtures & { fixture3: object }>({
  fixture1: ["Grapes", "Mango", "Gold"], //using key-value pair
  fixture2: 22, //using key-value pair
  // eslint-disable-next-line no-empty-pattern
  fixture3: async ({}, use) => {
    //using key-'async-method'
    console.log("Printing this line BEFORE using fixture 3");
    await use({ fname: "Abhishek", salary: 45000 });
    console.log("Printing this line AFTER using fixture 3");
  },
});

//importing test(extended test with fixtures) & expect
export default test;
export { expect } from "@playwright/test"; //! Way 1 to export 'expect'
//export const expect = test.expect; //! Way 2 to export 'expect'
