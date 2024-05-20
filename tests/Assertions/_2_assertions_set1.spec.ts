import { test, expect } from "@playwright/test";

test("Assert current Page URL", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");
  await page.locator('//a[@id="link1"]').click();
  await expect(page).toHaveURL(/selenium143/);
});

test("Assert current Page Title", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");
  await page.locator('//a[@id="link1"]').click();
  await expect(page).toHaveTitle(/Selenium/);
});

test("Assert element is enabled, disabled, hidden, visible", async ({
  page,
}) => {
  await page.goto("http://omayo.blogspot.com/");

  //enabled
  await expect(page.locator('//button[@id="myBtn"]')).toBeEnabled();
  await page.locator('//button[normalize-space()="Try it"]').click();
  //disabled
  await expect(page.locator('//button[@id="myBtn"]')).toBeDisabled();
  //hidden
  await expect(page.locator('//input[@id="hbutton"]')).toBeHidden();
  //visible
  await expect(page.locator('//input[@name="textboxn"]')).toBeVisible();
});

test("Assert text entered inside a textbox", async ({ page }) => {
  await page.goto("https://letcode.in/edit");
  await page.locator("//input[@id='fullName']").fill("Abhishek is awesome");
  await expect(page.locator("//input[@id='fullName']")).toHaveValue(/Abhishek/);
  await expect(page.locator('//input[@id="getMe"]')).toHaveValue(/ortonikm /);
});

test("Assert that checkbox/radio is checked", async ({ page }) => {
  await page.goto("https://letcode.in/radio");
  await expect(
    page.locator("//label[normalize-space()='Remember me']")
  ).toBeChecked();
  await page.locator("//label[normalize-space()='Remember me']").uncheck();
  await expect(
    page.locator("//label[normalize-space()='Remember me']")
  ).not.toBeChecked();
  await expect(page.locator("//input[@id='notfoo']")).toBeChecked();
  await page.locator("//input[@id='foo']").check();
  await expect(page.locator("//input[@id='notfoo']")).not.toBeChecked();
});

test("Assert element to contain text", async ({ page }) => {
  await page.goto("http://omayo.blogspot.com/");

  await expect(page.locator('//p[@id="pah"]')).toContainText(
    /PracticeAutomatio/
  );
  await expect(page.locator('//p[@id="pah"]')).toHaveText(
    "PracticeAutomationHere"
  );
});

test('Assert attribute,id and class', async ({ page }) => {

  await page.goto('https://letcode.in/buttons')
  await expect(page.locator('//label[normalize-space()="Get the X & Y co-ordinates"]')).toHaveAttribute('for','location');
  await expect(page.locator('//div[5]//div[1]//button[1]')).toHaveId('isDisabled');
  await expect(page.locator('//div[5]//div[1]//button[1]')).toHaveClass('button is-info');
  
})



