import { expect, test } from "@playwright/test";

test("Assert total count of list of elements", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.waitForLoadState("networkidle");

  //get the list of all the github links
  const allLinksLoc = page.locator("//app-gitrepos/div/div/ol/li/a");
  await expect(allLinksLoc).toHaveCount(30);
});

test("Assert if an entity is present in a list", async ({ page }) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.waitForLoadState("networkidle");

  const allLinksLoc = page.locator("//app-gitrepos/div/div/ol/li/a");
  expect(await allLinksLoc.allTextContents()).toContainEqual(
    "https://github.com/ortoniKC/JS_DS_ALGO"
  );
  expect((await allLinksLoc.allTextContents()).length).toBe(30);
});

test(" Assert if all entities in a list is present in same order", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.waitForLoadState("networkidle");

  const expectedList = [
    "https://github.com/ortoniKC/AnkitSharma-007",
    "https://github.com/ortoniKC/atom",
    "https://github.com/ortoniKC/Challenge",
    "https://github.com/ortoniKC/chrome-native-message",
    "https://github.com/ortoniKC/covid-chrome-extension",
    "https://github.com/ortoniKC/Cucumber-2022-letcode",
    "https://github.com/ortoniKC/Cucumber-Parallel",
    "https://github.com/ortoniKC/cypress",
    "https://github.com/ortoniKC/Cypress-1",
    "https://github.com/ortoniKC/cypress-documentation",
    "https://github.com/ortoniKC/cypress-example-recipes",
    "https://github.com/ortoniKC/cypress-realworld-app",
    "https://github.com/ortoniKC/design-resources-for-developers",
    "https://github.com/ortoniKC/drink_water_chrome_mv3",
    "https://github.com/ortoniKC/February",
    "https://github.com/ortoniKC/flutter",
    "https://github.com/ortoniKC/FlutterExamples",
    "https://github.com/ortoniKC/flutter_deep_ar_face_effect",
    "https://github.com/ortoniKC/Giphy-Chrome-extension",
    "https://github.com/ortoniKC/git-demo",
    "https://github.com/ortoniKC/github-automation",
    "https://github.com/ortoniKC/gravity-chrome-extension",
    "https://github.com/ortoniKC/java-string-letcode-2022",
    "https://github.com/ortoniKC/JavaDS",
    "https://github.com/ortoniKC/javascript-programming",
    "https://github.com/ortoniKC/javascript-tamil-tutorial-2023",
    "https://github.com/ortoniKC/Jio-Saavn-Dark-Theme",
    "https://github.com/ortoniKC/JS-DS-ALGO",
    "https://github.com/ortoniKC/JS_DS_ALGO",
    "https://github.com/ortoniKC/lambda-test-selenium-java-tutorial",
  ];

  expect(
    await page.locator("//app-gitrepos/div/div/ol/li/a").allTextContents()
  ).toStrictEqual(expectedList);
});

test("Assert if all entities in a list is present in any order using custom function", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.waitForLoadState("networkidle");

  const expectedList = [
    "https://github.com/ortoniKC/lambda-test-selenium-java-tutorial",
    "https://github.com/ortoniKC/AnkitSharma-007",
    "https://github.com/ortoniKC/Challenge",
    "https://github.com/ortoniKC/atom",
    "https://github.com/ortoniKC/chrome-native-message",
    "https://github.com/ortoniKC/covid-chrome-extension",
    "https://github.com/ortoniKC/Cucumber-2022-letcode",
    "https://github.com/ortoniKC/Cucumber-Parallel",
    "https://github.com/ortoniKC/cypress",
    "https://github.com/ortoniKC/Cypress-1",
    "https://github.com/ortoniKC/cypress-documentation",
    "https://github.com/ortoniKC/cypress-example-recipes",
    "https://github.com/ortoniKC/cypress-realworld-app",
    "https://github.com/ortoniKC/design-resources-for-developers",
    "https://github.com/ortoniKC/drink_water_chrome_mv3",
    "https://github.com/ortoniKC/February",
    "https://github.com/ortoniKC/flutter",
    "https://github.com/ortoniKC/FlutterExamples",
    "https://github.com/ortoniKC/flutter_deep_ar_face_effect",
    "https://github.com/ortoniKC/Giphy-Chrome-extension",
    "https://github.com/ortoniKC/git-demo",
    "https://github.com/ortoniKC/github-automation",
    "https://github.com/ortoniKC/gravity-chrome-extension",
    "https://github.com/ortoniKC/java-string-letcode-2022",
    "https://github.com/ortoniKC/JavaDS",
    "https://github.com/ortoniKC/javascript-programming",
    "https://github.com/ortoniKC/javascript-tamil-tutorial-2023",
    "https://github.com/ortoniKC/Jio-Saavn-Dark-Them",
    "https://github.com/ortoniKC/JS-DS-ALGO",
    "https://github.com/ortoniKC/JS_DS_ALGO",
  ];

  //! 😎😎😎 custom function 😎😎😎

  const checkListContainsAllElements = async <T>(
    expectedElements: T[],
    actualElements: T[]
  ) => {
    return expectedElements.every((element) =>
      actualElements.includes(element)
    );
  };
  expect(
    await checkListContainsAllElements(
      expectedList,
      await page.locator("//app-gitrepos/div/div/ol/li/a").allTextContents()
    )
  ).toBe(true);
});

test("Assert if all entities in a list is present in any order W/O using custom function", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.locator("//app-gitrepos/div/div/ol/li/a").last().waitFor();

  const expectedList = [
    "https://github.com/ortoniKC/lambda-test-selenium-java-tutorial",
    "https://github.com/ortoniKC/AnkitSharma-007",
    "https://github.com/ortoniKC/Challenge",
    "https://github.com/ortoniKC/atom",
    "https://github.com/ortoniKC/chrome-native-message",
    "https://github.com/ortoniKC/covid-chrome-extension",
    "https://github.com/ortoniKC/Cucumber-2022-letcode",
    "https://github.com/ortoniKC/Cucumber-Parallel",
    "https://github.com/ortoniKC/cypress",
    "https://github.com/ortoniKC/Cypress-1",
    "https://github.com/ortoniKC/cypress-documentation",
    "https://github.com/ortoniKC/cypress-example-recipes",
    "https://github.com/ortoniKC/cypress-realworld-app",
    "https://github.com/ortoniKC/design-resources-for-developers",
    "https://github.com/ortoniKC/drink_water_chrome_mv3",
    "https://github.com/ortoniKC/February",
    "https://github.com/ortoniKC/flutter",
    "https://github.com/ortoniKC/FlutterExamples",
    "https://github.com/ortoniKC/flutter_deep_ar_face_effect",
    "https://github.com/ortoniKC/Giphy-Chrome-extension",
    "https://github.com/ortoniKC/git-demo",
    "https://github.com/ortoniKC/github-automation",
    "https://github.com/ortoniKC/gravity-chrome-extension",
    "https://github.com/ortoniKC/java-string-letcode-2022",
    "https://github.com/ortoniKC/JavaDS",
    "https://github.com/ortoniKC/javascript-programming",
    "https://github.com/ortoniKC/javascript-tamil-tutorial-2023",
    "https://github.com/ortoniKC/Jio-Saavn-Dark-Theme",
    "https://github.com/ortoniKC/JS-DS-ALGO",
    "https://github.com/ortoniKC/JS_DS_ALGO",
  ];

  
  expect( await page.locator("//app-gitrepos/div/div/ol/li/a").allTextContents()
  ).toEqual(expect.arrayContaining(expectedList));
});

test("Assert if some entities in a list is present in any order using custom function", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.locator("//app-gitrepos/div/div/ol/li/a").last().waitFor();

  const expectedList = [
    "https://github.com/ortoniKC/JavaDS",
    "https://github.com/ortoniKC/javascript-programming",
    "https://github.com/ortoniKC/javascript-tamil-tutorial-2023",
    "https://github.com/ortoniKC/Jio-Saavn-Dark-Theme",
    "https://github.com/ortoniKC/JS-DS-ALGO",
    "https://github.com/ortoniKC/JS_DS_ALGO",
    "https://github.com/ortoniKC/design-resources-for-developers",
    "https://github.com/ortoniKC/drink_water_chrome_mv3",
    "https://github.com/ortoniKC/February",
    "https://github.com/ortoniKC/flutter",
    "https://github.com/ortoniKC/FlutterExamples",
    "https://github.com/ortoniKC/flutter_deep_ar_face_effect",
    "https://github.com/ortoniKC/Giphy-Chrome-extension",
    "https://github.com/ortoniKC/git-demo",
    "https://github.com/ortoniKC/github-automation",
    "https://github.com/ortoniKC/gravity-chrome-extension",
    "https://github.com/ortoniKC/java-string-letcode-2022"
   
  ];

  //! 😎😎😎 custom function 😎😎😎

  const checkListContainsAllElements = async <T>(
    expectedElements: T[],
    actualElements: T[]
  ) => {
    return expectedElements.every((element) =>
      actualElements.includes(element)
    );
  };
  expect(
    await checkListContainsAllElements(
      expectedList,
      await page.locator("//app-gitrepos/div/div/ol/li/a").allTextContents()
    )
  ).toBe(true);
});

test("Assert if some entities in a list is present in any order W/O using custom function", async ({
  page,
}) => {
  await page.goto("https://letcode.in/elements");
  await page
    .locator('//input[@placeholder="Enter your git user name eg., ortonikc"]')
    .fill("ortonikc");
  await page.keyboard.press("Enter");
  await page.locator("//app-gitrepos/div/div/ol/li/a").last().waitFor();

  const expectedList = [
    "https://github.com/ortoniKC/JavaDS",
    "https://github.com/ortoniKC/javascript-programming",
    "https://github.com/ortoniKC/javascript-tamil-tutorial-2023",
    "https://github.com/ortoniKC/Jio-Saavn-Dark-Theme",
    "https://github.com/ortoniKC/JS-DS-ALGO",
    "https://github.com/ortoniKC/JS_DS_ALGO",
    "https://github.com/ortoniKC/design-resources-for-developers",
    "https://github.com/ortoniKC/drink_water_chrome_mv3",
    "https://github.com/ortoniKC/February",
    "https://github.com/ortoniKC/flutter",
    "https://github.com/ortoniKC/FlutterExamples",
    "https://github.com/ortoniKC/flutter_deep_ar_face_effect",
    "https://github.com/ortoniKC/Giphy-Chrome-extension",
    "https://github.com/ortoniKC/git-demo",
    "https://github.com/ortoniKC/github-automation",
    "https://github.com/ortoniKC/gravity-chrome-extension",
    "https://github.com/ortoniKC/java-string-letcode-2022"
   
  ];

  
  expect( await page.locator("//app-gitrepos/div/div/ol/li/a").allTextContents()
  ).toEqual(expect.arrayContaining(expectedList));
});
