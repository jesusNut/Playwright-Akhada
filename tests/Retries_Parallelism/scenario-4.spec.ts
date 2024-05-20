import { test } from "@playwright/test";

//! 🧐🧐🧐 These are dummy tests to practice scenario 4 of parallelism 🧐🧐🧐
//--------------------------------------------------------------------------------------------------------------

test.describe.configure({mode: "parallel"});

test.describe("Second describe block", () => {

  test.describe.configure({mode: "serial"});

  test("rv-test-1b", async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
    console.log(`Worker id for rv-test-1b is ${test.info().workerIndex}`);
    console.log(
      `parallel index for rv-test-1b is ${test.info().parallelIndex}`
    );
    console.log(`Running test - ${test.info().title}`);
    await page.locator('//input[@id="email"]').fill("admin@admin.com");
    await page.locator('//input[@id="password"]').fill("admin123");
    await page.locator('//button[@id="submitLoginBtn"]').click();
    await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  });

  test("lambda-test-1b", async ({ page }) => {
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"
    );
    console.log(`Worker id for lambda-test-1b is ${test.info().workerIndex}`);
    console.log(
      `parallel index lambda-test-1b is ${test.info().parallelIndex}`
    );
    console.log(`Running test - ${test.info().title}`);
    await page.locator('//input[@id="title"]').fill("admin@admin.com");
    await page.locator('//textarea[@id="description"]').fill("I am the best");
    await page.locator('//input[@id="btn-submit"]').click();
    await page
      .locator('//input[@id="btn-submit"]')
      .waitFor({ state: "hidden" });
  });

  //! 🦗 before each hook 🦗

  test.beforeEach(async () => {
    console.log("I am before each for 1b");
  });

  //! 🦗 after each hook 🦗

  test.afterEach(async () => {
    console.log("I am after each for 1b");
  });

  //! 🦗 before all hook 🦗

  test.beforeAll(async () => {
    console.log("I am before all for 1b");
  });

  //! 🦗 after all hook 🦗

  test.afterAll(async () => {
    console.log("I am after all for 1b");
  });
});

test.describe("First describe block", () => {

  test.describe.configure({mode: "serial"});
  test("lambda-test-1a", async ({ page }) => {
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"
    );
    console.log(`Worker id for lambda-test-1a is ${test.info().workerIndex}`);
    console.log(
      `parallel index lambda-test-1a is ${test.info().parallelIndex}`
    );
    console.log(`Running test - ${test.info().title}`);
    await page.locator('//input[@id="title"]').fill("admin@admin.com");
    await page.locator('//textarea[@id="description"]').fill("I am the best");
    await page.locator('//input[@id="btn-submit"]').click();
    await page
      .locator('//input[@id="btn-submit"]')
      .waitFor({ state: "hidden" });
  });
  test("rv-test-1a", async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
    console.log(`Worker id for rv-test-1a is ${test.info().workerIndex}`);
    console.log(
      `parallel index for rv-test-1a is ${test.info().parallelIndex}`
    );
    console.log(`Running test - ${test.info().title}`);
    await page.locator('//input[@id="email"]').fill("admin@admin.com");
    await page.locator('//input[@id="password"]').fill("admin123");
    await page.locator('//button[@id="submitLoginBtn"]').click();
    await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  });

  //! 🦗 before each hook 🦗

  test.beforeEach(async () => {
    console.log("I am before each for 1a");
  });

  //! 🦗 after each hook 🦗

  test.afterEach(async () => {
    console.log("I am after each for 1a");
  });

  //! 🦗 before all hook 🦗

  test.beforeAll(async () => {
    console.log("I am before all for 1a");
  });

  //! 🦗 after all hook 🦗

  test.afterAll(async () => {
    console.log("I am after all for 1a");
  });
});


