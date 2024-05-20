import { defineConfig, devices } from "@playwright/test";
import { TestOptions } from "./tests/CustomFixtures/ParametrizingProject&Fixture_5/testoptions";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  /* Sets test timeout*/
  timeout: 300 * 1000,
  /* Sets expect timeout*/

  expect: {
    timeout: 30 * 1000,
  },

  /* Set which directory to be treated as test directory*/
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : undefined,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Configure Global Setup */
  //globalSetup : "./tests/API Testing/Authentication_saving_techniques/global-setup.ts",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://google.co.in',
    
    /* tests\CustomFixtures\ParametrizingProject&Fixture */
    //globalQaUrl : 'https://google.co.in',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: "on-first-retry",
    trace: "off",
    /* Define your own test id attribute */
    // testIdAttribute : 'data-test-id'

    /* run all projects headless or not */
    //headless: true

    /* Whether to automatically capture a screenshot after each test. Defaults to 'off'. */
    // screenshot: "only-on-failure",

    /* Whether to record video for each test. Defaults to 'off'. */
    //video : "retry-with-video"

    /* Emulates consistent viewport for each page and for all projects(browsers) */
    //viewport: { width: 1536, height: 824 },

    /* Changes the timezone of the context and for all projects(browsers) */
    // timezoneId: "Europe/Madrid",

    /* Specify user locale for all pages and for all projects(browsers) */
    // locale: "es_ES",

    /* Context geolocation. */
    // geolocation: { longitude: 55.258133, latitude: 25.18561 },

    /* Context permission. */
    // permissions: ["geolocation"],

    /* mention the storage state that needs to be used for all the projects (browsers)-if using Global setup concept to save authentication process */
    //storageState : "./playwright/.auth/globalSetupAuth.json"
  },

  /* Using grep and grep-invert for tags*/
  //grep : /smoke/, //! filter all tests on basis of regex of tag - 'smoke'
  //grep : [new RegExp('smo')],//! filter all tests on basis of regex of tag - 'smo'
  //grep : [new RegExp('smo'), new RegExp('reg')],//! filter all tests on basis of regex of tag - 'smo' || 'reg'
  //grepInvert : /@sanity/,

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "google",
    //   use : {globalQaUrl : 'https://google.co.in'},
    //   ...devices["Desktop Chromium"]
    // },
    // {
    //   name: "amazon",
    //   use : {globalQaUrl : 'https://amazon.com'},
    //   ...devices["Desktop Firefox"]
    // },
    /*Project creation while using dependency concept to save authentication state*/
    {
      name: "SetupUsingDependencyForOrangeHRMLogin",
      testMatch: "**/*.setup.ts",
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chromium"],
      },
    },
   
    //!  🦘 to demo tests\Handling-Elements\_28_device-emulation.spec.ts 🦘
    // {
    //   name: "my custom mobile demo",
    //   use: {
    //     ...devices["iPhone 14 Pro Max"],
    //     isMobile : true
    //   },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' ,headless : false},
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
