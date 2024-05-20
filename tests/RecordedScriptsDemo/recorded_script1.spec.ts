import { test, expect } from '@playwright/test';

test('qa-practice.netlify.app-Happy Login Scenario', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin@admin.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  await expect(page.locator('#logout')).toContainText('Log Out');
});

test('qa-practice.netlify.app-Wrong Password Scenario', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin@admin.com');
  await page.getByPlaceholder('Password').click();
 await page.getByPlaceholder('Password').fill('wrongData');
 await page.getByRole('button', { name: 'Submit' }).click();
 await expect(page.getByText('Bad credentials! Please try')).toBeVisible();
 await expect(page.getByRole('alert')).toContainText('Bad credentials! Please try again! Make sure that you\'ve registered.');
});