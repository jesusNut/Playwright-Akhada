import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  FETCHING DATA FROM ELEMENT  ☠️☠️
 *================================================================**/

//! 😇 Methods covered:
//* 1. textContent() - gives the associated text of an element from insde the DOM whether is is visible or not.
//* 2. innerText() - gives the associated text of an element from insde the DOM only whatever is visible.
//* 3. innerHTML() - gives the entire HTML content inside of opening and closing tag of that element.
//* 4. getAttribute() - gives the associated attribute.
//* 5. evaluate() - to fetch CSS property.

//? https://www.youtube.com/watch?v=MxAZiAbv45Q

test("understanding textContent()", async ({ page }) => {
  await page.goto("https://www.programsbuzz.com/course/playwright-tutorial");

  console.log(
    await page.locator('//a[normalize-space()="About Us"]').textContent()
  ); //🤩 way-1

  const cookie_policy_loc = page.locator(
    '//a[normalize-space()="Cookie Policy"]'
  );
  console.log(await cookie_policy_loc.textContent()); //🤩 way-2

  //🤩🤩 using textContent() on a element which does not contain any text - GIVES STRING OF 0 SIZE 🤩🤩

  const image_with_notext_loc = page.locator(
    '//img[@alt="Playwright Tutorial"]'
  );
  console.log(await image_with_notext_loc.textContent());
  console.log(typeof (await image_with_notext_loc.textContent()));
});

test("understanding innerText()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  //see the difference:
  console.log(await page.locator('//form[@name="form1"]').innerText());

  console.log(await page.locator('//form[@name="form1"]').textContent());
});

test("understanding innerHTML()", async ({ page }) => {
  await page.goto("https://omayo.blogspot.com/");

  console.log(await page.locator('//form[@name="form1"]').innerHTML());
});

test("understanding getAttribute()", async ({ page }) => {
  await page.goto("https://letcode.in/buttons");

  const attributeData = await page
    .locator('//button[@id="home"]')
    .getAttribute("routerlink");
  console.log(attributeData);

  console.log(
    await page.locator('//button[@id="color"]').getAttribute("class")
  );
});

test("understanding evaluate() method to fetch CSS property", async ({
  page,
}) => {
  //? https://shiv-jirwankar.medium.com/get-css-properties-of-web-element-with-playwright-e092fdc9f462

  await page.goto("https://letcode.in/buttons");

  //finding background-color, a css property 'display', height & width of an element
  const button_loc = page.locator('//button[@id="color"]');
  const cssPropertyValues = await button_loc.evaluate((el) => {
    return [
      window.getComputedStyle(el).getPropertyValue("background-color"),
      window.getComputedStyle(el).getPropertyValue("display"),
      window.getComputedStyle(el).getPropertyValue("height"),
      window.getComputedStyle(el).getPropertyValue("width"),
    ];
  });

  console.log('background-color is : '+ cssPropertyValues[0]);
  console.log('value of display property is : '+ cssPropertyValues[1]);
  console.log('Height CSS property is : '+cssPropertyValues[2]);
  console.log('Width CSS property is : '+cssPropertyValues[3]);
});
