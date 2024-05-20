import { test } from "@playwright/test";

//! 🧐🧐🧐 These are dummy tests to practice screenshots and video scenarios 🧐🧐🧐
//--------------------------------------------------------------------------------------------------------------

test("rv-test", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
});

test("lambda-test", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"
  );
  await page.locator('//input[@id="title"]').fill("admin@admin.com");
  await page.locator('//textarea[@id="description"]').fill("I am the best");
  await page.locator('//input[@id="btn-submit"]').click();
  await page.locator('//input[@id="btn-submit"]').waitFor({ state: "hidden" });
});


