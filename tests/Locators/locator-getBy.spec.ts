import { test, expect, selectors } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  UNDERSTANDING getByXXX METHODS ☠️☠️
 
       ☠️ getByRole
       ☠️ getByLabel
       ☠️ getByPlaceHolder
       ☠️ getByTitle
       ☠️ getByAltText
       ☠️ getByText
       ☠️ getByTestId
 *================================================================**/


test("getByRole", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //! 1. Name used in getByRole is the visible text && not same as attribute 'name' used in HTML tags.
  //! 2. By default the name used will be case in-sensitive, which means 'exact' property will be false.
  //! 3. We can use regular expressions in names like - '/password/' (but this regex will be case sensitive).
  //! 4. We can use regular expressions in names like - '/login/i' ('i' after slash makes regex case-insensitive).

  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
});

test("getByLabel", async ({ page }) => {
  //example-1
  await page.goto("https://qa-practice.netlify.app/auth_ecommerce");

  //! Allows locating input elements by the text of the associated <label> or aria-labelledby element, or by the aria-label attribute.

  await page.getByLabel("Email").fill("admin@admin.com");
  await page.getByLabel("Password").fill("admin123");
  await page.getByRole("button", { name: /Submit/i }).click(); //using regex

  //example-2
  await page.goto("https://bookcart.azurewebsites.net/login");

  await page.getByLabel("Username").fill("Abhishek");
  await page.getByLabel("Password").fill("Jadoo123");

  //example-3: aria-label

  await page.goto("https://www.google.com/");

  await page.getByLabel("Search", { exact: true }).fill("Ankush");
  //if we dont put exact as 'true' here, PW will select more than one matching selectors in DOM.
  await page.getByRole("button", { name: "Google Search" }).click();
});

test("getByPlaceHolder", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //! 1. Allows locating input elements by the 'placeholder' attribute's text.
  //! 2. By default the text used will be case in-sensitive, which means 'exact' property will be false.

  await page.getByPlaceholder("username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
});

test("getByTitle", async ({ page }) => {
  //! 1. Allows locating input elements by the 'title' attribute's text.
  //! 2. By default the text used will be case in-sensitive, which means 'exact' property will be false.

  await page.goto("https://www.google.com/");
  await page.getByTitle("search").fill("Ankush");

  await page.getByRole("button", { name: "Google Search" }).click();
});

test("getByAltText", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();

  //! 1. Allows locating input elements by the 'alt' attribute's text.
  //! 2. By default the text used will be case in-sensitive, which means 'exact' property will be false.

  await page.getByAltText("PROFILE PICTURE").click();
});

test("getByText", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill("Admin");
  await page.getByRole("textbox", { name: /Password/ }).fill("admin123");
  await page.getByRole("button", { name: /login/i }).click();
  await page.getByAltText("PROFILE PICTURE").click();
  await page.getByText("LOGOUT").click();
  const headerOnMainPage = page.getByRole("heading", { name: "Login" });
  await expect(headerOnMainPage).toBeVisible();
});

test("getByTestId", async ({ page }) => {
  selectors.setTestIdAttribute("data-test-id");

  //! 1. By default, page.getByTestId() will locate elements based on the 'data-testid' attribute.

  //! 2. If our company has not defined data-testid attribute, in that case,
  //!    we can choose any attribute to be used in place of data-testid attribute by CONFIGURING  playwright.config.ts file.

  // Example of a website which has defined 'data-test-id' attribute which is not same as default 'data-testid' attribute.
  // Procedure : We have defined in playwright.config.ts file that "testIdAttribute : 'data-test-id'",
  // means, system should consider 'data-test-id' attribute and not the default one 'data-testid' attribute, while
  // working with getByTestId() method.

  await page.goto("https://www.thewarehouse.co.nz/");
  await page.getByTestId("stores-btn").click();
  const storepageheading = page.getByRole("heading", { name: "store finder" });
  await expect(storepageheading).toBeVisible();

  //! 3. If our company has not defined data-testid attribute, in that case,
  //!    we can choose any attribute to be used in place of data-testid attribute by using method:
  //!   'selectors.setTestIdAttribute("data-test-id")'

  await page.goBack();
  await page.getByTestId("stores-btn").click();
  await expect(storepageheading).toBeVisible();
});
