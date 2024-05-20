import { test, chromium, expect } from "@playwright/test";

/**==================================================================
 *!    ☠️☠️  HANDLING NEW TAB AND WINDOWS ☠️☠️
 *================================================================**/

//? https://playwright.dev/docs/pages
//? https://www.youtube.com/watch?v=--aXd2b3D5I&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=36 [Simple way]
//? Vignesh Udemy

/**==================================================================
 *todo  😏😏😏 POINTS TO REMEMEBER😏😏😏
 *! The pages in a context always run independently.
 *! Even if focus is on one page, the other pages will continue the execution whether we can see it or not.
 *! ONLY job of bringToFront() method  is to make the page visible to us.
 *! For playwright tabs/windows and pages are one and same. So, handling approach is same for all.
 *================================================================**/

test("Understanding concept of pages - without any fixture", async () => {
  const browser = await chromium.launch();

  //! BrowserContexts provide a way to operate multiple independent browser SESSIONS.
  const context = await browser.newContext();

  //! Each BrowserContext can have multiple pages.
  //! A Page refers to a single tab or a popup window within a browser-context.
  //! It should be used to navigate to URLs and interact with the page content.
  const page1 = await context.newPage(); //open up a new blank tab/page
  const page2 = await context.newPage(); //open up a new blank tab/page

  //check number of pages opened

  const allPages = context.pages();
  console.log(`Number of pages created are : ${allPages.length} `);

  //page 1 and page 2 are completely independent of each other and works at same time

  await page2.goto("https://www.selenium.dev/");
  await expect(page2).toHaveTitle("Selenium");
  await page2.locator("//a[@id='navbarDropdown']").click();
  await page2.waitForTimeout(3000);

  await page1.goto("https://www.google.co.in/");
  await page1.locator("//textarea[@id='APjFqb']").click();
  await page1.locator("//textarea[@id='APjFqb']").fill("Abhisheke");
  await expect(page1).toHaveTitle("Google");

  //switch the focus on page 1
  await page1.bringToFront();
  await page1.waitForTimeout(6000);

  //switch the focus on page 2
  await page2.bringToFront();
  await page2.waitForTimeout(3000);
});

test("Understanding concept of pages - with 'context' fixture", async ({
  context,
}) => {
  //!😏 Here 'context' fixture type is BrowserContext only.
  //! 1. If running using extension:  Which browser type will be launched can be decided using which profile we are using to run the test.
  //! 2. If running using CMD: Which browser type will be launched can be decided using Projects configured in playwright.config.ts (can be chnaged by passing --project flag)

  const page1 = await context.newPage(); //open up a new blank tab/page
  const page2 = await context.newPage(); //open up a new blank tab/page

  //check number of pages opened

  const allPages = context.pages();
  console.log(`Number of pages created are : ${allPages.length} `);

  //page 1 and page 2 are completely independent of each other and works at same time

  await page2.goto("https://www.selenium.dev/");
  await expect(page2).toHaveTitle("Selenium");
  await page2.locator("//a[@id='navbarDropdown']").click();
  await page2.waitForTimeout(3000);

  await page1.goto("https://www.google.co.in/");
  await page1.locator("//textarea[@id='APjFqb']").click();
  await page1.locator("//textarea[@id='APjFqb']").fill("Abhisheke");
  await expect(page1).toHaveTitle("Google");

  //switch the focus on page 1
  await page1.bringToFront();
  await page1.waitForTimeout(6000);

  //switch the focus on page 2
  await page2.bringToFront();
  await page2.waitForTimeout(3000);
});

test("Understanding concept of pages - with 'context' & 'page' fixture", async ({
  context,
  page,
}) => {
  //!😏 Here 'context' fixture type is BrowserContext only.
  //! 1. If running using extension:  Which browser type will be launched can be decided using which profile we are using to run the test.
  //! 2. If running using CMD: Which browser type will be launched can be decided using Projects configured in playwright.config.ts (can be chnaged by passing --project flag)
  //!😏 'page' fixture acts as the first tab/page which will automatically be launched.

  const page2 = await context.newPage(); //open up a new (second) blank tab/page

  //check number of pages opened

  const allPages = context.pages();
  console.log(`Number of pages created are : ${allPages.length}`);

  //page opened using fixture and page 2 are completely independent of each other and works at same time

  await page2.goto("https://www.selenium.dev/");
  await expect(page2).toHaveTitle("Selenium");
  await page2.locator("//a[@id='navbarDropdown']").click();
  await page2.waitForTimeout(3000);

  await page.goto("https://www.google.co.in/");
  await page.locator("//textarea[@id='APjFqb']").click();
  await page.locator("//textarea[@id='APjFqb']").fill("Abhisheke");
  await expect(page).toHaveTitle("Google");

  //switch the focus on page 1
  await page.bringToFront();
  await page.waitForTimeout(6000);

  //switch the focus on page 2
  await page2.bringToFront();
  await page2.waitForTimeout(3000);
});

test("Clicking a link on a page opening other tab", async ({ page }) => {
  //! 😏 The 'popup' event on browser contexts can be used to get new tabs that are created in the context.
  //! 😏 This can be used to handle new pages opened by target="_blank" links.
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //always handle the event first and then do the event which trigger that event.
  const [newtab] = await Promise.all([
    page.waitForEvent("popup"), //! 🎃 dont use await here 🎃
    page.locator("//a[normalize-space()='OrangeHRM, Inc']").click(),
  ]);

  //wait for the new tab to completely load
  await newtab.waitForLoadState();

  //do something on the new tab
  await newtab
    .locator("//input[@id='Form_submitForm_EmailHomePage']")
    .fill("Iamabhishek@kaku.com");
  await newtab.waitForTimeout(3000);

  //bring parent tab on the focus
  await page.bringToFront();

  //do something on parent tab
  await page.locator("//input[@placeholder='Username']").fill("Chirkoot");
  await page.waitForTimeout(3000);

  //bring new tab on the focus
  await newtab.bringToFront();
  await page.waitForTimeout(3000);

  //total number of pages opened at this point
  console.log(
    `Total number of pages opened at this point is : ${
      newtab.context().pages().length
    }`
  );

  //close the new tab
  await newtab.close();

  //close the parent tab
  await page.close();
});
test("Clicking a link on a page opening other window", async ({ page }) => {
  //! 😏 The 'page' event on browser contexts can be used to get new windows that are created in the context.
  //! 😏 This can be used to handle new pages opened by target="_blank" links.
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page
    .locator("//a[normalize-space()='Open New Seperate Windows']")
    .click();

  //always handle the event first and then do the event which trigger that event.
  const [newwindow] = await Promise.all([
    page.waitForEvent("popup"), //! 🎃 dont use await here 🎃
    await page.locator("//button[@class='btn btn-primary']").click(),
  ]);

  //wait for the new tab to completely load
  await newwindow.waitForLoadState();

  //do something on the new tab
  await newwindow.locator("//span[normalize-space()='Downloads']").click();
  await newwindow.waitForTimeout(3000);

  //bring parent tab on the focus
  await page.bringToFront();

  //do something on parent tab
  await page.locator("//a[normalize-space()='Home']").click();
  await page.waitForTimeout(3000);

  //bring new tab on the focus
  await newwindow.bringToFront();
  await newwindow.waitForTimeout(3000);

  //close the new tab
  await newwindow.close();

  //close the parent tab
  await page.close();
});

test("Handling multiple tabs", async ({ page }) => {
  await page.goto(
    "https://www.hyrtutorials.com/p/window-handles-practice.html"
  );

  //always handle the event first and then do the event which trigger that event.
  // 🤓 'const [multitabs]' is array destructuring concept.
  const [multitabs] = await Promise.all([
    page.waitForEvent("popup"), //! 🎃 dont use await here 🎃
    await page.locator("//button[@id='newTabsBtn']").click(),
  ]);

  //wait for the new tabS to completely load
  await multitabs.waitForLoadState();

  //print total number of tabs opened
  const allPages = multitabs.context().pages();
  console.log(`Total number of tabs opened are ${allPages.length}`);

  //do something on second new tab
  await allPages[2]
    .locator("//ul[@id='nav1']//a[normalize-space()='Contact']")
    .click();
  await allPages[2].waitForTimeout(3000);

  //bring first tab on the focus
  await allPages[1].bringToFront();

  //do something on the first new tab
  await allPages[1].locator("//input[@id='firstName']").fill("Abhishek");
  await allPages[1].waitForTimeout(3000);

  //bring parent tab on the focus
  await page.bringToFront();
  await page.waitForTimeout(3000);

  // close the second tab
  await allPages[2].close();

  // close the first tab
  await allPages[1].close();

  //close the parent tab
  await page.close();
});

test("Handling multiple windows", async ({ page }) => {
  await page.goto(
    "https://www.hyrtutorials.com/p/window-handles-practice.html"
  );

  //always handle the event first and then do the event which trigger that event.
  const [multiwindows] = await Promise.all([
    page.waitForEvent("popup"), //! 🎃 dont use await here 🎃
    await page.locator("//button[@id='newWindowsBtn']").click(),
  ]);

  //wait for the new windowS to completely load
  await multiwindows.waitForLoadState();

  //fetch all windows from the context
  const allwindows = multiwindows.context().pages();

  //print pthe number of wndows opened at this moment
  console.log(`The number of windows opened are ${allwindows.length}`);

  //do something on the second newly opened window

  await allwindows[2]
    .locator(
      "//body/div[@id='body-wrapper']/div[@id='content-wrapper']/div[@id='main-wrapper']/div[@id='main']/div[@id='Blog1']/div[@class='blog-posts hfeed']/div[@class='post-outer']/div[@class='post hentry']/article/div[@id='post-body-299858861183690484']/div[@dir='ltr']/form/div[@class='container'][contains(text(),'Please fill in this form to create an account. or ')]/input[1]"
    )
    .fill("Abhishek");
  await allwindows[2].waitForTimeout(3000);

  //shift focus on first newly opened tab
  await allwindows[1].bringToFront();

  //do something on the first newly opened window
  await allwindows[1].locator("//input[@id='firstName']").fill("Bhardwaj");
  await allwindows[1].waitForTimeout(3000);

  //shift focus on parent tab
  //! We could have used 'page' insted of allwindows[0] as inside the array 'allwindows', oth index denotes 'page' only.
  await allwindows[0].bringToFront();
  await allwindows[0].locator("//input[@id='name']").focus();
  await allwindows[0].locator("//input[@id='name']").fill("Abhishek Bhardwaj");
  await allwindows[0].waitForTimeout(3000);

  //close all the windows

  for (const iterator of allwindows) {
    await iterator.close();
  }
});




