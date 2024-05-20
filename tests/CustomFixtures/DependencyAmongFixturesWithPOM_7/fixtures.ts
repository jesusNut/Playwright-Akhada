//!💰 There are certain scenarios where we want to make sure than Fixture 1 is always set up before Fixture 2.
//!💰 For example : Lets say we when we click a link on 'FirstPage'  it opens a new 'SecondPage' in a new tab.
//!💰 In 'fixtures.ts' file, I want that 'FirstPage' is always configured BEFORE 'SecondPage' is configured.
//!💰 Same concept is used in notes : while "Integrating New Window/New tab scenario in Framework"

//!==================================================================================================================

//* 🤪 Playwright ensures that the 'FirstPage/fixture1' is executed before the 'SecondPage/fixture2' because 'SecondPage/fixture2' depends on 'FirstPage/fixture1' in 'fixtures.ts' file.
//* 🤪 Playwright's test runner resolves fixtures based on their dependencies.
//* 🤪 Since 'SecondPage/fixture2' waits for the 'FirstPage/fixture1' to perform an action , it inherently guarantees that 'FirstPage/fixture1' is fully set up before 'SecondPage/fixture2' starts its setup.


//* 🤪 The 'SecondPage/fixture2' will be torn down before the 'FirstPage/fixture1' fixture. 
//* 🤪 Playwright's test runner tears down fixtures in the reverse order of their setup.
//* 🤪 Since 'SecondPage/fixture2' depends on 'FirstPage/fixture1' and is set up after 'FirstPage/fixture1', it will be torn down first.

//!==================================================================================================================

import { FirstPage, SecondPage } from "./someclasses";
import { test as Base } from "@playwright/test";

type Myfixtures = {
  fixture1: FirstPage;
  fixture2: SecondPage;
};

export const test = Base.extend<Myfixtures>({
  fixture2: async ({ fixture1 }, use) => {
    console.log("I am setting up fixture2/SecondPage");
    const returnedSecondPage = await fixture1.returnSecondPage();
    await use(new SecondPage(returnedSecondPage));
    console.log("I am tearing down fixture2/SecondPage");
  },
  fixture1: async ({ page }, use) => {
    console.log("I am setting up fixture1/FirstPage");
    await use(new FirstPage(page));
    console.log("I am tearing down fixture1/FirstPage");
  },
});
