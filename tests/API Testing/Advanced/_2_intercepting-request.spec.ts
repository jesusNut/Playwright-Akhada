import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  INTERCEPTING REQUESTS ☠️☠️
 
//? https://www.youtube.com/watch?v=hk6ND5gVdyc [Checkly]
//? https://www.youtube.com/watch?v=7brjcfsoU7U [Amuthan-TMB]
//? https://www.youtube.com/watch?v=H3n5lzI139w [Basarat]
//? https://www.youtube.com/watch?v=D9ZLfBDiw74
//? https://www.youtube.com/watch?v=-pH6Dax-OyY
//? Artem Bondar

 *================================================================**/


test("1. Intercepting requests and adding a custom header ", async ({
  page,
}) => {
  //* Here we will intercept all the requests and add a custom header to all the requests.

  await page.route("**/*", async (route) => {
    
    //get the original headers
    const originalHeaders = route.request().headers();
    //modify headers (add a new header-value)
    const headers = {
      ...originalHeaders,
      "modified-by": "Abhishek",
    };
    //tell PW to continue with the request, go and hit server with modified headers
    await route.continue({ headers });
  });

  //* Here we will monitor one of the response and see that request for that response contains the new header or not

  page.on("response", async (response) => {
    if (
      response.request().url() === "https://demo.playwright.dev/api-mocking/"
    ) {
      console.log(await response.request().allHeaders());
    }
  });

  await page.goto("https://demo.playwright.dev/api-mocking/");
});

test("2. Intercepting requests and Aborting all requests with images ", async ({
  page,
}) => {
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "image") {
      return await route.abort();
    }
    return await route.continue();
  });

  await page.goto('https://www.salesforce.com/');
});

