import { test, expect } from "@playwright/test";

//write a describe block
test.describe("HomePageTest", () => {
  //write a test block
  test("Check title of homepage 1", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //verify title
    await expect(page).toHaveTitle(
      "Practice E-Commerce Site – SDET Unicorns"
    );
  });

  test("Check title of homepage 2", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //verify title
    await expect(page).toHaveTitle(
      "Practice E-Commerce Site – SDET Unicorns"
    );
  });
});


