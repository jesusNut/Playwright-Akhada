import { test, expect } from '@playwright/test';

test('qa-practice.netlify.app- Happy login-Recorded using codegen', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin@admin.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();
  await expect(page.locator('#logout')).toContainText('Log Out');
});