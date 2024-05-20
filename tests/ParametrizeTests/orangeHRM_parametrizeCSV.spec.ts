import { test, expect } from "@playwright/test";

//!🤣 used CSV file is @ json_csv_parametrizetestdata\orangeHRMdata2.csv 🤣
//!🤣 used JSON file is @ json_csv_parametrizetestdata\orangeHRMlogindata.json 🤣

import * as logindata  from '../../json_csv_parametrizetestdata/orangeHRMlogindata.json'
import fs from "fs";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync("json_csv_parametrizetestdata/orangeHRMdata2.csv"), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ",",
});



test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill(logindata.username);
  await page
    .getByRole("textbox", { name: /Password/ })
    .fill(logindata.password);
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

records.forEach((orangeHRMData :any) => {
  test(`Add candidate for recruitment : ${orangeHRMData.firstname}`, async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Recruitment" }).click();
    await page.waitForURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates",
      { waitUntil: "networkidle" }
    );
    await expect(
      page.locator("//button[normalize-space()='Add']")
    ).toBeVisible();
    await page.locator("//button[normalize-space()='Add']").click();
    await page.waitForURL(/addCandidate/, { waitUntil: "networkidle" });
    await page
      .locator("//input[@placeholder='First Name']")
      .fill(orangeHRMData.firstname);
    await page
      .locator("//input[@placeholder='Last Name']")
      .fill(orangeHRMData.lastname);
    await page
      .locator(
        "//input[@placeholder='Type here' and ./parent::div/preceding-sibling::div/label[text()='Email']]"
      )
      .fill(orangeHRMData.email);
    await page.locator("//button[normalize-space()='Save']").click();
    await expect(page.locator("//p[text()='Success']")).toBeVisible();
  });
});
