import { test as baseTest } from "@playwright/test";

//! use test.extend() method to create custom fixtures

//===========================================================================================================================
//! 👉👉👉 If the type of any of the property is 'any' type, then while implementing that fixture using an async function
//! in the extend method, the pre-defined fixtures like page, browser, context etc. will not work. 👈👈👈
//===========================================================================================================================

//* Here we will use both test fixtures as well as woker fixture and then e will understand its flow in a test.

type Myfixture = {
  fixture1: any;
};

type MyWorkerFixture = {
  workerfixture1: any;
};

const test = baseTest.extend<Myfixture, MyWorkerFixture>({
  // eslint-disable-next-line no-empty-pattern
  fixture1: async ({}, use: any) => {
    console.log("I am running BEFORE *****  test fixture *****");
    await use("I am ***** test fixture *****");
    console.log("I am running AFTER *****  test fixture *****");
  },
  workerfixture1: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use: any) => {
      console.log("I am running BEFORE *****  WORKER fixture *****");
      await use("I am ***** WORKER fixture *****");
      console.log("I am running AFTER *****  WORKER fixture *****");
    },
    { scope: "worker" },
  ],
});

//importing test(extended test with fixtures) & expect
export default test;
export { expect } from "@playwright/test"; //! Way 1 to export 'expect'
//export const expect = test.expect; //! Way 2 to export 'expect'
