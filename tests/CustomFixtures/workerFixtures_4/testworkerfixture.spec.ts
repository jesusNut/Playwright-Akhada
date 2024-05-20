import test from "./customFixtureWorketFixture";

//! Try to run the below tests with parallel = false/true in the playwright.config.ts file so tht workers can be same and different respectively.

test("Understanding flow of test fixtures and worker fixtures - 1", async ({
  fixture1,
  workerfixture1,
}, workerInfo) => {
  console.log(fixture1 + workerInfo.workerIndex);
  console.log(workerfixture1 + workerInfo.workerIndex);
});

test("Understanding flow of test fixtures and worker fixtures - 2", async ({
  fixture1,
  workerfixture1,
}, workerInfo) => {
  console.log(fixture1 + workerInfo.workerIndex);
  console.log(workerfixture1 + + workerInfo.workerIndex);
});
