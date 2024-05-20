import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️ Taking screenshots ☠️☠️

 ** 1. Take screenshot and save it into rootfolder.
 ** 2. Take screenshot and save it into custom folder.
 ** 3. Take FULL SCROLLABLE PAGE screenshot and save it into custom folder.
 ** 4. Take A PARTICULAR ELEMENT screenshot and save it into custom folder. //? https://www.youtube.com/watch?v=HUzCg0o0ScM
 ** 5. Take any type of sccreenshots [from serial 1 to 4] and attach it to test results without saving anywhere ]: //? https://www.youtube.com/watch?v=CNiKT-qCj40
 ** 6. Controlling screenshots from config file - //? Vignesh-Udemy

 *================================================================**/

test("Scenario 1 Take screenshot and save it into rootfolder", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.screenshot({ path: "before.png" });
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  await page.screenshot({ path: "after.png" });
});

test("Scenario 2 Take screenshot and save it into custom folder", async ({
  page,
  browserName,
}) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.screenshot({
    path: "./saved_artifacts/before" + browserName.toString() + ".png",
  });
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  await page.screenshot({
    path: "./saved_artifacts/after" + browserName.toString() + ".png",
  });
});

test("scenario 3 Take FULL SCROLLABLE PAGE screenshot and save it into custom folder", async ({
  page,
  browserName,
}) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.screenshot({
    path: "./saved_artifacts/beforeFull" + browserName.toString() + ".png",
    fullPage: true,
  });
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  await page.screenshot({
    path: "./saved_artifacts/afterFull" + browserName.toString() + ".png",
    fullPage: true,
  });
});

test("scenario 4 Take A PARTICULAR ELEMENT screenshot and save it into custom folder", async ({
  page,
  browserName,
}) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  await page
    .locator("//span[text()='Apple iPhone 12, 128GB, Black']/parent::div")
    .screenshot({
      path: "./saved_artifacts/firstitem" + browserName.toString() + ".png",
    });
});

test("scenario 5 rv-test-take screenshot and attach to results", async ({
  page,
}, testInfo) => {
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce.html");
  await page.locator('//input[@id="email"]').fill("admin@admin.com");
  await page.locator('//input[@id="password"]').fill("admin123");
  await page.locator('//button[@id="submitLoginBtn"]').click();
  await page.locator('//a[@id="logout"]').waitFor({ state: "visible" });
  await testInfo.attach("screenshot of product page", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});

test("scenario 5 lambda-test-take screenshot and attach to results", async ({
  page,
}, testInfo) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"
  );
  await page.locator('//input[@id="title"]').fill("admin@admin.com");
  await page.locator('//textarea[@id="description"]').fill("I am the best");
  await testInfo.attach("screenshot before submit", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
  await page.locator('//input[@id="btn-submit"]').click();
  await page.locator('//input[@id="btn-submit"]').waitFor({ state: "hidden" });
  await testInfo.attach("screenshot of loader", {
    body: await page.locator('//div[@id="submit-control"]//img').screenshot(),
    contentType: "image/png",
  });
});