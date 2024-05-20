import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  MOCKING-STUBBING RESPONSES ☠️☠️
 
//? https://www.youtube.com/watch?v=hk6ND5gVdyc [Checkly]
//? https://www.youtube.com/watch?v=7brjcfsoU7U [Amuthan-TMB]
//? https://www.youtube.com/watch?v=H3n5lzI139w [Basarat]
//? https://www.youtube.com/watch?v=D9ZLfBDiw74
//? https://www.youtube.com/watch?v=-pH6Dax-OyY
//? Artem Bondar

 *================================================================**/

test("1. Mock a response - example 1 with route.fulfill", async ({ page }) => {

  //* We will intercept a request and tell PW to fullfill it with the response provided in the code. 

  await page.route(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits",
    async (route) => {
      const json = [
        { name: "Ramu", id: 3 },
        { name: "Cukatoo", id: 2 },
        { name: "Barron", id: 1 },
      ];

      await route.fulfill({ json, status : 202 });
    }
  );

  await page.goto("https://demo.playwright.dev/api-mocking/");
  await page.waitForLoadState("networkidle");
});

test("2. Mock a response - example 2 with route.fulfill", async ({ page }) => {

   //* We will intercept a request and tell PW to fullfill it with the response provided in the code. 

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('//input[@placeholder="Username"]').fill("Admin");
  await page.locator('//input[@placeholder="Password"]').fill("admin123");
  await page.locator('//button[normalize-space()="Login"]').click();

  await page.route(
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
    async (route) => {
      const json = {
        data: {
          "leave.assign_leave": false,
          "leave.leave_list": true,
          "leave.apply_leave": true,
          "leave.my_leave": true,
          "time.employee_timesheet": false,
          "time.my_timesheet": true,
        },
        meta: [],
        rels: [],
      };

      await route.fulfill({ json, status : 203 });
    }
  );

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
});

test("3. Mock a response - example 3 with route.fetch & route.fulfill", async ({ page }) => {

//* Fetch method : Performs the request and fetches result without fulfilling it, so that the response could be modified and then fulfilled.

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('//input[@placeholder="Username"]').fill("Admin");
  await page.locator('//input[@placeholder="Password"]').fill("admin123");
  await page.locator('//button[normalize-space()="Login"]').click();

  await page.route(
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
    async (route) => {

        //fetch the response
      const result = await route.fetch({
        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
      });
        //modify the response json
      const json = await result.json();
      json.data["time.employee_timesheet"] = false;
      json.data["leave.assign_leave"] = false;

      await route.fulfill({json});
    }
  );

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
});
