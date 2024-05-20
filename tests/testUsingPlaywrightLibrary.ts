//! Writing automation code using Playwright Library [AND NOT by using Playwright TEST]

import { chromium } from "@playwright/test";

// writing a self invoking async function
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  //launch chromium [Browser type]
  const browser = await chromium.launch({ headless: false });

  //get a new browser context [BrowserContext type] in incognito
  const browserInstance = await browser.newContext();

  //get a new page [Page type] inside the browser context
  const page = await browserInstance.newPage();

  //navigate the page
  await page.goto("https://practice.sdetunicorns.com/");

  //close the browser
  await browser.close();
})();
