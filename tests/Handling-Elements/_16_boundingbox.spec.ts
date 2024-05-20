import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  Understanding - BOUNDING BOX ☠️☠️
 *!
 *!     ☠️   Getting height and width of elements ☠️
 *!     ☠️   Getting coordinates of elements ☠️
 *================================================================**/

//? Artem Bondar - Udemy
//? https://www.youtube.com/watch?v=2Zrk7FXKDI4

test("Find height, Width and coordinates of an element", async ({ page }) => {
  await page.goto("https://letcode.in/buttons");
  const subject = page.locator('//button[@id="position"]');
  //boundingBox
  const box = await subject.boundingBox();
  //finding height
  console.log(`The height is : ${box?.height} pixel`); //130
  //finding width
  console.log(`The width is : ${box?.width} pixel`); //40
  //finding x coordinate
  console.log(`X coordinate is ${box?.x}`);
  //finding y coordinate
  console.log(`Y coordinate is ${box?.y}`);
});

test("Click on the center of the locator using mouse", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/modal-overlays/toastr");
  const button = page.locator('//button[normalize-space()="Random toast"]');
  //boundingBox
  const box = await button.boundingBox();
  //finding height
  console.log(`The height is : ${box?.height} pixel`);
  //finding width
  console.log(`The width is : ${box?.width} pixel`);
  //finding x coordinate
  console.log(`X coordinate is ${box?.x}`);
  //finding y coordinate
  console.log(`Y coordinate is ${box?.y}`);

  //click on center of the button
  const y = box!.height / 2 + box!.y;
  const x = box!.width / 2 + box!.x;

  await page.waitForTimeout(3000);
  await page.mouse.click(x, y); //! clicks on the middle of the button
});

test("Handling slider using coordinates - ex 1", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");

  const sliderBox = await page
    .locator('//nb-tab[@class="content-active"]//ngx-temperature-dragger')
    .boundingBox();

  //Objective : Move slider to maximum.
  if (sliderBox) {
    //steps : we will click on the middle of the box and then grag it to right and then down.
    const x = sliderBox.width / 2 + sliderBox.x;
    const y = sliderBox.height / 2 + sliderBox.y;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();
  }
});

test("Handling slider using coordinates - ex 2", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");

  const sliderBox = await page
    .locator('//nb-tab[@class="content-active"]//ngx-temperature-dragger')
    .boundingBox();

  //Objective : Move slider to minimum.
  if (sliderBox) {
    //steps : we will click on the middle of the box and then grag it to right and then down.
    const x = sliderBox.width / 2 + sliderBox.x;
    const y = sliderBox.height / 2 + sliderBox.y;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 100, y);
    await page.waitForTimeout(1500);
    await page.mouse.move(x - 100, y + 100);
    await page.mouse.up();
  }
});
