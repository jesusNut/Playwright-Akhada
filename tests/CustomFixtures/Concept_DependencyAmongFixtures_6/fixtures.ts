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


import { test as Base } from "@playwright/test";

type Myfixtures = {
  fixture1: string;
  fixture2: string;
  fixture3: string;
};

export const test = Base.extend<Myfixtures>({

fixture1 : async ({},use) => {
  console.log("I am before of fixture 1");
  await use("fixture1")
  console.log("I am after of fixture 1");
},
fixture2 : async ({fixture1, fixture3},use) => {
  console.log("I am before of fixture 2");
  await use("fixture2" + fixture1 + fixture3)
  console.log("I am after of fixture 2");
},
fixture3 : async ({},use) => {
  console.log("I am before of fixture 3");
  await use("fixture3")
  console.log("I am after of fixture 3");
}

});
