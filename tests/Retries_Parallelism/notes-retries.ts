/**===============================================================
 *!    ☠️☠️  UNDERSTANDING RETRIES ☠️☠️
 *================================================================**/

//? Antem-Bondar- Udemy course- Retries
//? https://playwright.dev/docs/test-retries
//? https://playwright.dev/docs/test-retries#failures 
// [Understand worker process & how afterAll and beforeAll behaves in case of first failures and failures/pass on retries]

//* 1. Test retries are a way to automatically re-run a test when it fails.
//* 2. When enabled, failing tests will be retried multiple times until they pass, or until the maximum number of retries is reached.
//* 3. Configuration using cmd : npx playwright test --retries=3
//* 4. Configuration using config file :

//! 🤴🏻 way 1:
//import { defineConfig } from '@playwright/test';

// export default defineConfig({
// Give failing tests 3 retry attempts
//     retries: 3,
//   });

//! 🤴🏻 way 2:
//import { defineConfig } from '@playwright/test';

// export default defineConfig({
// configure retries values in CI/CD or local
//     retries: process.env.CI ? <number for CI/CD> : <number for local>>,
//   });

//* 5. Configuration on spec-file level : 'test.describe.configure({retries : <number>});' [overrides retry config settings in config file, if any]

//todo : If a test fails in first run and then passes in subsequent retries, then those TCs are categorized in reports as 'Flaky'