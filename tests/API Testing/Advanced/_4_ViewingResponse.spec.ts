import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️ VIEWING RESPONSE ☠️☠️
 
//* Viewing response means we want to view some attribute of response.
//* There are two ways we can do it:
//!. 1. Using  page.on("response", (response) => {});
//!  2. Using waitForResponse() method.

 *================================================================**/

test("1. Viewing response - way 1", async ({ page }) => {
  //* STEP 1: Here we will intercept a request and a custom header.
  //* STEP 2: Then we will get the response and view response and check whether request for that response had the header or not.

  //step 1:
  await page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      const interceptedHeaders = route.request().headers();
      interceptedHeaders["sec-ch-ua-platform"] = "macOS";
      interceptedHeaders.modifiedBy = "Abhishek";
      await route.continue({ headers: interceptedHeaders });
    }
  );

  //! STEP 2 : 🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘 VIEWING RESPONSE 🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘
  page.on("response", (response) => {
    if (response.url() === "https://conduit-api.bondaracademy.com/api/tags") {
      console.log(response.request().headers());
    }
  });

  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(2000);
});

test("2. Viewing response - way 2", async ({ page }) => {
  //* STEP 1: Here we will intercept a request and a custom header.
  //* STEP 2: Then we will get the response and view response and check whether request for that response had the header or not.

  //step 1:
  await page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      const interceptedHeaders = route.request().headers();
      interceptedHeaders["sec-ch-ua-platform"] = "macOS";
      interceptedHeaders.modifiedBy = "gunda";
      await route.continue({ headers: interceptedHeaders });
    }
  );

  //! STEP 2 : 🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘 VIEWING RESPONSE 🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘🤘

  //Notice no await
  const responsePromise = page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/tags"
  );
  
  await page.goto("https://conduit.bondaracademy.com/");
  const response = await responsePromise;
  console.log(response.request().headers());
});
