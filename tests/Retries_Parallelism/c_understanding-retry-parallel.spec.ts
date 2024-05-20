import { test } from "@playwright/test";

//! 🧐🧐🧐 These are dummy tests to practice Retries & parallelism 🧐🧐🧐
//--------------------------------------------------------------------------------------------------------------

test("rv-test-1c", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  console.log(`Worker id for rv-test-1c is ${test.info().workerIndex}`); 
  console.log(`parallel index for rv-test-1c is ${test.info().parallelIndex}`); 
  console.log(`Running test - ${test.info().title}`); 
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
});

test("lambda-test-1c", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"
  );
  console.log(`Worker id for lambda-test-1c is ${test.info().workerIndex}`); 
  console.log(`parallel index lambda-test-1c is ${test.info().parallelIndex}`); 
  console.log(`Running test - ${test.info().title}`); 
  await page.locator('//input[@id="title"]').fill("admin@admin.com");
  await page.locator('//textarea[@id="description"]').fill("I am the best");
  await page.locator('//input[@id="btn-submit"]').click();
  await page.locator('//input[@id="btn-submit"]').waitFor({ state: "hidden" });
});

//! 🦗 before each hook 🦗

test.beforeEach(async () => {
  console.log("I am before each for 1c");
});

//! 🦗 after each hook 🦗

test.afterEach(async () => {
  console.log("I am after each for 1c");
});

//! 🦗 before all hook 🦗

test.beforeAll(async () => {
  console.log("I am before all for 1c");
});

//! 🦗 after all hook 🦗

test.afterAll(async () => {
  console.log("I am after all for 1c");
});