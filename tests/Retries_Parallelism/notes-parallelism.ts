/**===============================================================
 *!    ☠️☠️  UNDERSTANDING PARALLELISM ☠️☠️
 *================================================================**/

//todo :: 🤓🤓🤓 'fullyParallel' in config files is used to control only one thing :
//todo :: 🤓🤓🤓 whether to run tests in a spec file in parallel or not.

//? Antem-Bondar- Udemy course- parallelism
//? https://playwright.dev/docs/test-parallel#introduction

//----scenario 1--------------------------------------------------------------------------------------------------------------------------------

//! Assumption1 : this example below is with one project{browser} configured.
//! Assumption2 : we have 3 spec files each file having 2 test cases. [3*2 =6]
//! Assumption3 : 'fullyParallel' is 'false' in spec file.
//! Assumption4 : max workers supported by the system is 4.

//npx playwright test a_understanding-retry-parallel b_understanding-retry-parallel c_understanding-retry-parallel --headed --project chromium

//*1.  PW generates one worker per spec file. So, if we give command to run all 3 spec files at once,
//*   then PW will generate  3 (as 1*3 = 3) workers.
//*2. Each worker for spec file will run the two tests in it, in the order of declaration.
//todo :: Playwright Test runs tests from a single file in the order of declaration, unless you parallelize tests in a single file.

//----scenario 2--------------------------------------------------------------------------------------------------------------------------------

//! Assumption1 : this example below is with one project{browser} configured.
//! Assumption2 : we have 3 spec files each file having 2 test cases.[3*2=6 test cases]
//! Assumption3 : 'fullyParallel' is 'true' in spec file.
//! Assumption4 : max workers supported by the system is 4.

//*1.  PW SHOULD generate one worker per test case. So, if we give command to run all 3 spec files at once,
//*   then PW SHOULD generate  6 (as 2*3 = 6) workers.
//*2. BUT since the maximum workers supported in the system is 4, so PW will generate 4 workers for entire 6 tests cases.

//----scenario 3--------------------------------------------------------------------------------------------------------------------------------

//! Assumption1 : This example below is with one project{browser} configured.
//! Assumption2 : We have a spec file with 2 tests.
//! Assumption3 : 'fullyParallel' in config file is set to 'false'

//* we can use 'test.describe.configure({ mode: 'parallel' });' in the spec file to make all tests run in parallel.

//----scenario 4--------------------------------------------------------------------------------------------------------------------------------

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
// });

//----COMMANDS--------------------------------------------------------------------------------------------------------------------------

//* 🤡 LIMITING WORKERS :
//* from command line : npx playwright test --workers 4
//* or same can be done from config file : ' workers: process.env.CI ? 1 : <desired number>'
//? https://playwright.dev/docs/test-parallel#limit-workers

//* 🤡 DISABLE PARALLELISM :
//* We can make sure all tests in all spec files run on a single worker by making worker count as 1.
//* from command line : npx playwright test --workers=1
//* or same can be done from config file : 'workers: process.env.CI ? 1 : 1'
//? https://playwright.dev/docs/test-parallel#disable-parallelism
