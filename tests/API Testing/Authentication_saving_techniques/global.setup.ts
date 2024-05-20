import { test as setup, expect } from "@playwright/test";

setup("Login setup for RS Website", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator('//input[@id="login"]').click();
  await expect(
    page.locator("//button[normalize-space()='Sign Out']")
  ).toBeVisible();
  await page
    .context()
    .storageState({ path: "./playwright/.auth/dependencyAuth.json" });
});
