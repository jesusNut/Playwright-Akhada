import { expect, test } from "@playwright/test";

//? Rahul Shetty -Udemy : Section 10 : API testing with playwright and Build Mix of Web and API tests [full-section]

//!-------🔰 AGENDA 🔰--------------------------------------------------------------------------------
//! In this example, we will fetch the token used for authorization after login using API in beforeAll hook.
//! Then, we will use that token to manually set it in local storage(as the AUT behaviour is saving token in local storage for keeping user logged in)
//! by using addInitScript().

//todo : ⚠️ THIS IS NOT THE BEST WAY TO RE-USE AUTHENTICATION/LOGIN STATE. JUST FOR UNDERSTANDING PURPOSE. ⚠️
//todo : ⚠️ This approach covers cookies and local storage based authentication ONLY⚠️
//todo : USE DEPENDENCY CONCEPT OR GLOBAL SETUP CONCEPT AS DISCUSSED IN 'Authentication_saving_techniques' TOPIC.

//!---------------------------------------------------------------------------------------------

let token: string;

test.beforeAll(async ({ request }) => {
  const postResponse = await request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" },
    }
  );
  const postResponseBody = await postResponse.json();
  token = postResponseBody.token;
});

test("1. Saving token in local storage using addInitScript() method", async ({ page }) => {
  //place the token value in local storage to navigate directly logged in.
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");
});

test("2. Saving token in local storage & Create order using API", async ({ page, request }) => {

  //place the token value in local storage to navigate directly logged in.
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  //Navigate to home page already logged in
  await page.goto("https://rahulshettyacademy.com/client");

  //create order using API
  const response = await request.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: {
        orders: [
          {
            country: "India",
            productOrderedId: "6581ca979fd99c85e8ee7faf",
          },
          {
            country: "India",
            productOrderedId: "6581cade9fd99c85e8ee7ff5",
          },
          {
            country: "India",
            productOrderedId: "65ffdd35a86f8f74dcaa22da",
          },
        ],
      },
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(await response.json());
  console.log(response.status + "----" + response.statusText);

  await page.locator("//button[@routerlink='/dashboard/myorders']").click();
  await expect(
    page.locator("//h1[normalize-space()='Your Orders']")
  ).toBeVisible();
  await expect(page.locator("//tbody/tr")).toHaveCount(3);
});



