import { test, expect } from "@playwright/test";
/**=================================================================================================
 *!    ☠️☠️  HANDLING TOOL TIPS AND TOAST MESSAGES ☠️☠️
 *==================================================================================================**/
//? Artem Bondar_Udemy- Tooltip

test("Handling tooltip and verifying its text", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/modal-overlays/tooltip");

  const hoverableLoc = page.locator('//button[normalize-space()="Right"]');
  await hoverableLoc.hover();
  const tooltipLoc = page.locator("//div[@id='cdk-overlay-0']/nb-tooltip");
  console.log(await tooltipLoc.locator("//div/span").textContent());
  expect(await tooltipLoc.locator("//div/span").textContent()).toBe(
    "This is a tooltip"
  );
});

test("Handling toast message and verifying its text", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/modal-overlays/toastr");
  await page.locator('//input[@name="content"]').fill("");
  await page.waitForTimeout(1500);
  await page.locator('//input[@name="content"]').fill("I am the new data!");
  await page.waitForTimeout(1500);
  await page.locator('//button[normalize-space()="Show toast"]').click();
  const toastMsgLoc = page.locator('//div[@class="message"]');
  console.log(await toastMsgLoc.textContent());
  expect(await toastMsgLoc.textContent()).toBe("I am the new data!");
});
