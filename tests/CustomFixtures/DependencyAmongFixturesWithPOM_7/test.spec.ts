import { test } from "./fixtures";

//!==================================================================================================================

//* 🤪 Here, we have used only 'fixture2' in our test, but in fixture.ts file - before setting up 'fixture2', 'fixture1' will be set up.[See console log]
//* 🤪 Playwright's test runner resolves fixtures based on their dependencies.
//* 🤪 Since SecondPage/fixture2 waits for the FirstPage/fixture1 to perform an action in 'fixtures.ts' file. , it inherently guarantees that firstPage/fixture1 is fully set up before secondPage/fixture2 starts its setup.

//* 🤪 The 'SecondPage/fixture2' will be torn down before the 'FirstPage/fixture1' fixture. [See console log]
//* 🤪 Playwright's test runner tears down fixtures in the reverse order of their setup.
//* 🤪 Since 'SecondPage/fixture2' depends on 'FirstPage/fixture1' and is set up after 'FirstPage/fixture1', it will be torn down first.

//!==================================================================================================================

test("Check if expected link is visible on second page", async ({
  fixture2,
}) => {
  await fixture2.verifyLinkOnSecondPage();
});
