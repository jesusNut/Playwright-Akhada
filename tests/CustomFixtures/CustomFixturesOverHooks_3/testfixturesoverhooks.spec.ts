import test, { expect } from "./hooksFixture";

test("Check the number of items on the page", async ({
  loginlogoutfixture,
}) => {
  await expect(async () => {
    expect(
      await loginlogoutfixture
        .locator(
          "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)>div>div>div>div"
        )
        .count()
    ).toBe(6);
  }).toPass();
});

test("Verify cart page holds the selected items", async ({
  loginlogoutfixture,
}) => {
  await loginlogoutfixture
    .locator('//button[@id="add-to-cart-sauce-labs-backpack"]')
    .click();
  await loginlogoutfixture
    .locator('//button[@id="add-to-cart-sauce-labs-bike-light"]')
    .click();
  await loginlogoutfixture.locator('//a[@class="shopping_cart_link"]').click();
  expect(loginlogoutfixture.url()).toContain(
    "https://www.saucedemo.com/cart.html"
  );
  await expect(loginlogoutfixture.locator(".cart_item")).toHaveCount(2);
});
