import test from "./testoptions";

test("mysample test", async ({ page, globalQaUrl }) => {
  await page.goto(globalQaUrl);
  console.log(page.url());
});
