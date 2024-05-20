import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING ANNOTATIONS inside Test block ☠️☠️

  //? https://playwright.dev/docs/api/class-test#methods
  //? https://www.youtube.com/watch?v=rIuYrdV4Eb4&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=12
 *================================================================**/

test.use({})

// 🐼🐼🐼 Practice below annotations & its variants 🐼🐼🐼
//! 🐼 test.only()
//! 🐼 test.fixme() - test.fixme(title, body), test.fixme(title, details, body)
//! 🐼 test.fixme() @ runtime - test.fixme(condition, description), test.fixme()
//! 🐼 test.slow() @ runtime- test.slow(condition, description), test.slow()
//! 🐼 test.setTimeOut() - test.setTimeout(120000);
//! 🐼 test.fail() - test.fail(title, body), test.fail(title, details, body)
//! 🐼 test.fail() @ runtime - test.fail(), test.fail(condition, description)
//! 🐼 test.info() - returns information about the currently running test. ⚠️ test.info() & testInfo object are one and same.⚠️
//! 🐼 test.use() - specifies options like locale, viewport for an ENTIRE SPEC FILE OR  a test.describe() group. 
//! ⚠️ test.fixme(callback), test.slow(callback)⚠️ CAN BE USED ONLY INSIDE DESCRIBE BLOCKS ON DIRECTLY ON SPEC FILE LEVEL.
//! ⚠️ DECLARING test.fixme(callback), test.slow(callback) ON test level gives error : ⚠️ test.XXXX() with callback can be used only in Describe block ⚠️
//! ⚠️ test.fixme(callback), test.slow(callback)⚠️ covered in : tests\Hooks-tags-annotations\_6_Annotations-describe.spec.ts


test("TEST-1", async () => {
  console.log("I am test - 1");
});

test.skip("TEST-2", async () => {
  console.log("I am test - 2");
});

test("TEST-3", async () => {
  console.log("I am test - 3");
});

test("TEST-4", async () => {
  console.log("I am test - 4");
});
test("TEST-5", async () => {
  console.log("I am test - 5");
});

test("TEST-6", async () => {
  console.log("I am test - 6");
});

test.skip("A test supposed to be failed", async () => {
  test.fail();
  //expect(true).toBeFalsy();
  console.log("I am a test supposed to be fail");
});

test("A test supposed to be failed-2", async ({ browserName }) => {
  test.fail(browserName === "firefox"); //with condition
  console.log("I am a test supposed to be fail");
});

test.skip("A slow test", async ({ page }) => {
  test.slow();
  await page.goto("http://omayo.blogspot.com/");
  const checkbox = page.locator('//input[@id="dte"]');
  await expect(checkbox).toBeDisabled();
  await page.locator('//button[normalize-space()="Check this"]').click();
  //after 10s, the checkbox will be enabled.
  await checkbox.check();
  if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
});

test.skip("A slow test on condition", async ({ page }) => {
  test.slow(
    test.info().title.includes("slow"),
    "Slow tests needs more test timeouts"
  );
  await page.goto("http://omayo.blogspot.com/");
  const checkbox = page.locator('//input[@id="dte"]');
  await expect(checkbox).toBeDisabled();
  await page.locator('//button[normalize-space()="Check this"]').click();
  //after 10s, the checkbox will be enabled.
  await checkbox.check();
  if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
});

test.fixme("Setting timeout of a slow test", async ({ page }) => {
  test.setTimeout(14200);
  await page.goto("http://omayo.blogspot.com/");
  const checkbox = page.locator('//input[@id="dte"]');
  await expect(checkbox).toBeDisabled();
  await page.locator('//button[normalize-space()="Check this"]').click();
  //after 10s, the checkbox will be enabled.
  await checkbox.check();
  if (await checkbox.isChecked()) console.log(`The checkbox is now checked`);
});

//---------------------------------------------------HOOKS--------------------------------------------------------

//! 🦗 before each hook 🦗

test.beforeEach(async () => {
  //test.setTimeout(15000);
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
