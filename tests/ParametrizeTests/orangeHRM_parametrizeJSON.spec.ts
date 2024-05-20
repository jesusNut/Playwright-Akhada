import { test, expect } from "@playwright/test";

//!🤣 used JSON fileS are @ json_csv_parametrizetestdata\orangeHRMdata1.json & json_csv_parametrizetestdata\orangeHRMlogindata.json 🤣

import orangeHRMData from '../../json_csv_parametrizetestdata/orangeHRMdata1.json';
import * as logindata  from '../../json_csv_parametrizetestdata/orangeHRMlogindata.json'

//

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill(logindata.username);
  await page.getByRole("textbox", { name: /Password/ }).fill(logindata.password);
  await page.getByRole("button", { name: /login/i }).click();
  await expect(
    page.locator("//h6[normalize-space()='Dashboard']")
  ).toBeVisible();
});

test("1.Verify timesheets page under quick launch menu", async ({ page }) => {
  await page.waitForURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    { waitUntil: "networkidle" }
  );
  await expect(page.locator("//button[@title='Timesheets']")).toBeVisible();
  await page.locator("//button[@title='Timesheets']").click();
  await page.waitForURL(/viewEmployeeTimesheet/, { waitUntil: "networkidle" });
  const innerdata = await page
    .locator("//li[@class='oxd-topbar-body-nav-tab --parent --visited']/span")
    .innerText();
  expect(innerdata).toBe("Timesheets ");
});

orangeHRMData.forEach(orangeHRMDatum =>{ 
  
  test(`Add candidate for recruitment : ${orangeHRMDatum.fname}`, async ({ page }) => {
  await page.getByRole("link", { name: "Recruitment" }).click();
  await page.waitForURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates",
    { waitUntil: "networkidle" }
  );
  await expect(page.locator("//button[normalize-space()='Add']")).toBeVisible();
  await page.locator("//button[normalize-space()='Add']").click();
  await page.waitForURL(/addCandidate/, { waitUntil: "networkidle" });
  await page.locator("//input[@placeholder='First Name']").fill(orangeHRMDatum.fname);
  await page.locator("//input[@placeholder='Last Name']").fill(orangeHRMDatum.lname);
  await page
    .locator(
      "//input[@placeholder='Type here' and ./parent::div/preceding-sibling::div/label[text()='Email']]"
    )
    .fill(orangeHRMDatum.email);
  await page.locator("//button[normalize-space()='Save']").click();
  await expect(page.locator("//p[text()='Success']")).toBeVisible();
})
})







