import { test, expect } from "@playwright/test";

/**====================================================================
 *!    ☠️☠️  UNDERSTANDING WAIT FOR REQUEST & WAIT FOR RESPONSE ☠️☠️
 ----------------------------------------------------------------------
 //? https://playwright.dev/docs/api/class-page#page-wait-for-response
 //? https://playwright.dev/docs/api/class-page#page-wait-for-request
 //? https://www.youtube.com/watch?v=MK0O8s3NBA4
 //? https://www.youtube.com/watch?v=5CER0dKweyw&t=4s
 *==============================================================**/

//! 🤖🤖🤖 Understanding waitForResponse() 🤖🤖🤖

//* We have learnt in tests\Handling-Elements\_23_methods-Used-On-List-Of-Elements.spec.ts that
//*  METHODS WHICH ARE USED ON LIST OF ELEMENTS DOES NOT WAIT FOR LOCATORS TO RESOLVE TO ELEMENTS.
//* In tests\Handling-Elements\_23_methods-Used-On-List-Of-Elements.spec.ts, we have learnt 2 methods to resolve the issue.
//* Here we will use waitForResponse to solve the issue.

test("using waitForResponse without predicate-way 1", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Start waiting for response before clicking. Note no await.
  const promiseForResponse = page.waitForResponse(
    "https://api.github.com/users/jesusNut/repos"
  );
  //! 👉👉👉 Click on the button which send the API call from website to server.
  await page.locator("#search").click();

  //!👉👉👉 Wait for the promise to resolve and give you the response before actually asserting the count.
  const actualResponse = await promiseForResponse;

  //!👉👉👉 Now you can use the Response type 'actualResponse', the way you want.
  const statusCode = actualResponse.status();
  console.log(statusCode);

  //!👉👉👉 Once we are confirmed that the Page will always wait for the API response to be available, then do assertions.
  expect(
    await page.locator("//app-gitrepos/div/div/ol/li").count()
  ).toBeGreaterThan(24);
});

test("using waitForResponse with predicate-way 2", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Start waiting for response before clicking. Note no await.
  const promiseForResponse = page.waitForResponse((res) => {
    return (
      res.status() === 200 &&
      res.request().url() === "https://api.github.com/users/jesusNut/repos"
    );
  });
  //! 👉👉👉 Click on the button which send the API call from website to server.
  await page.locator("#search").click();

  //!👉👉👉 Wait for the promise to resolve and give you the response before actually asserting the count.
  const actualResponse = await promiseForResponse;

  //!👉👉👉 Now you can use the Response type 'actualResponse', the way you want.
  console.log(await actualResponse.json());

  //!👉👉👉 Once we are confirmed that the Page will always wait for the API response to be available, then do assertions.
  expect(
    await page.locator("//app-gitrepos/div/div/ol/li").count()
  ).toBeGreaterThan(17);
});

test("using waitForResponse with Promise.all-way 3", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Use Promise.all()
  const returnedValue = await Promise.all([
    page.locator("#search").click(),
    page.waitForResponse((res) => {
      return (
        res.status() === 200 &&
        res.request().url() === "https://api.github.com/users/jesusNut/repos"
      );
    }),
  ]);

  //!👉👉👉 Now you can use the 'returnedValue', the way you want.
  console.log(await returnedValue[1].json());

  //!👉👉👉 Once we are confirmed that the Page will always wait for the API response to be available, then do assertions.
  expect(
    await page.locator("//app-gitrepos/div/div/ol/li").count()
  ).toBeGreaterThan(17);
});

//! 🤖🤖🤖 Understanding waitForRequest() 🤖🤖🤖

//* waitForRequest() : Waits for the matching request and returns it.
//* we can use waitForRequest() in the same 3 ways we used for waitForResponse()

test("using waitForRequest without predicate-way 1", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Start waiting for request before clicking. Note no await.
  const promiseForRequest = page.waitForRequest(
    "https://api.github.com/users/jesusNut/repos"
  );
  //! 👉👉👉 Click on the button which send the API call from website to server.
  await page.locator("#search").click();

  //!👉👉👉 Wait for the promise to resolve and give you the request before actually asserting the count.
  const actualRequest = await promiseForRequest;

  //!👉👉👉 Now you can use the Request type 'actualRequest', the way you want.
  const method = actualRequest.method();
  console.log(method);
  console.log(actualRequest.postData());
});

test("using waitForRequest with predicate-way 2", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Start waiting for request before clicking. Note no await.
  const promiseForRequest = page.waitForRequest((req) => {
    return (
      req.method() === "GET" &&
      req.url() === "https://api.github.com/users/jesusNut/repos"
    );
  });
  //! 👉👉👉 Click on the button which send the API call from website to server.
  await page.locator("#search").click();

  //!👉👉👉 Wait for the promise to resolve and give you the request before actually asserting the count.
  const actualRequest = await promiseForRequest;

  //!👉👉👉 Now you can use the Request type 'actualRequest', the way you want.
  const method = actualRequest.method();
  console.log(method);
  console.log(await actualRequest.allHeaders());
});

test("using waitForRequest with Promise.all-way 3", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator("//input[@placeholder='Enter your git user name eg., ortonikc']")
    .fill("jesusnut");

  //! 👉👉👉 Use Promise.all()
  const returnedValue = await Promise.all([
    page.locator("#search").click(),
    page.waitForRequest((req) => {
      return (
        req.method() === "GET" &&
        req.url() === "https://api.github.com/users/jesusNut/repos"
      );
    }),
  ]);

  //!👉👉👉 Now you can use the 'returnedValue', the way you want.
  console.log(returnedValue[1].method());
  console.log(await returnedValue[1].allHeaders());
});
