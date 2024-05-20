import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  MONITORING REQUESTS & RESPONSES ☠️☠️
 
//? https://www.youtube.com/watch?v=hk6ND5gVdyc [Checkly]
//? https://www.youtube.com/watch?v=7brjcfsoU7U [Amuthan-TMB]
//? https://www.youtube.com/watch?v=H3n5lzI139w [Basarat]
//? https://www.youtube.com/watch?v=D9ZLfBDiw74
//? https://www.youtube.com/watch?v=-pH6Dax-OyY
//? Artem Bondar

 *================================================================**/

test("1. Monitoring requests, response and its attributes ", async ({
  page,
}) => {
  //* Here we will monitor all the requests & responses that are made while launching a page and log it along with its attributes.

  page.on("request", (request) => {
    console.log(`${request.method()}-----${request.url()}`);
  });

  page.on("response", (response) => {
    console.log(`${response.request().url()}>>>>>>${response.status()}`);
  });
  await page.goto("https://demo.playwright.dev/api-mocking/");
});
