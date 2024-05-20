import { test, expect } from "@playwright/test";



const creds = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "locked_out_user", password: "secret_sauce" },
];

creds.forEach((data) => {
  test(`Swag labs login - ${data.username} `, async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("//input[@id='user-name']").fill(data.username);
    await page.locator('//input[@id="password"]').fill(data.password);
    await page.locator('//input[@id="login-button"]').click();
   await expect(page.locator('//span[@class="title"]')).toBeVisible();
  });
});
