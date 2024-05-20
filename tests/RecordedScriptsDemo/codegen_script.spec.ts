import { test} from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.co.in/');
});