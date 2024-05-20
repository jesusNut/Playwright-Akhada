import test, { expect } from "./customFixture";

test("using custom fixtures", async ({ fixture1, fixture2, fixture3 }) => {
  console.log(fixture1.length);
  console.log(fixture2 + 100);
  console.log(fixture3);
  expect(fixture3).toBeTruthy();
});
