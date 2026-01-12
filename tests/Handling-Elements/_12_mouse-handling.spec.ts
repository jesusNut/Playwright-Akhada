import { Locator, expect, test } from "@playwright/test";

/**=================================================================================================
 *!    ☠️☠️  HANDLING MOUSE ACTIONS ☠️☠️
 *==================================================================================================**/

//? Vignesh_Udemy
//? https://www.youtube.com/watch?v=Z2yAkGiDmBY&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=37
//? Artem Bondar_Udemy - Sliders

test("Mouse Hovering", async ({ page }) => {
  await page.goto("https://demo.opencart.com/");
  await page.locator("//a[normalize-space()='Components']").hover();
  await page.waitForTimeout(3000);
  await page.locator("//a[normalize-space()='Monitors (2)']").hover();
  await page.locator("//a[normalize-space()='Monitors (2)']").click();
});

test("Mouse right click/context actions", async ({ page }) => {
  await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
  await page
    .locator("//span[@class='context-menu-one btn btn-neutral']")
    .click({ button: "right" });
  await page.waitForTimeout(3000);

  //After clikcing on 'delete'/'paste' etc. sub-menu, we get a dialog box. So we will verify he message by printing it.
  //As always write the event handler before triggering actual event.

  page.on("dialog", async (dialogbox) => {
    console.log(`Type of dialog/alert is : ${dialogbox.type()}`);
    console.log(`Message in dialog/alert is : ${dialogbox.message()}`);
    await dialogbox.accept();
  });

  await page
    .locator(
      "//li[@class='context-menu-item context-menu-icon context-menu-icon-paste']"
    )
    .click();
});

test("Mouse double click", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("//button[normalize-space()='Copy Text']").dblclick();
});

test("Mouse drag and drop - approach 1", async ({ page }) => {
  await page.goto(
    "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
  );

  const draggable = page.locator("//div[@id='box7']");
  const dropArea = page.locator('//div[@id="box107"]');

  //! 🤩 page.mouse concept 👇👇👇
  //? https://playwright.dev/docs/api/class-mouse

  await draggable.hover();
  await page.mouse.down({ button: "left" });
  await dropArea.hover();
  await page.mouse.up({ button: "left" });
});

test("Mouse drag and drop - approach 2", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/drag-and-drop-demo"
  );

  //demo-1
  const draggable1 = page.locator('//span[normalize-space()="Draggable 1"]');
  const draggable2 = page.locator('//span[normalize-space()="Draggable 2"]');
  const dropArea = page.locator('//div[@id="mydropzone"]');

  await draggable1.dragTo(dropArea);
  await page.waitForTimeout(3000);
  await draggable2.dragTo(dropArea);

  //demo-2
  const draggable3 = page.locator('//div[@id="draggable"]');
  const dropArea2 = page.locator('//div[@id="droppable"]');

  await draggable3.dragTo(dropArea2);

  const dropArea2Text = page.locator('//div[@id="droppable"]/p');
  expect(await dropArea2Text.textContent()).toBe("Dropped!");
});

test("Mouse drag and drop - by coordinates", async ({ page }) => {
  await page.goto("https://demoqa.com/droppable/");

  //! dragTo() method drags the draggable and put it exactly in the  middle of the dropable.
  //If we want to drag the draggable and put it at some exact cordinate inside of the dropable, then use below:

  const draggable1 = page.locator('//div[@id="draggable"]');
  const dropArea = page.locator(
    '//div[@id="simpleDropContainer"]//div[@id="droppable"]'
  );

  await draggable1.dragTo(dropArea, {
    targetPosition: { x: 50, y: 50 },
    sourcePosition: { x: 10, y: 10 },
  });
});

test("Sliders - traditional approach", async ({ page }) => {
  await page.goto("https://groww.in/calculators/sip-calculator");

  const slider = page.locator(
    '//div[@class="col l7 sc54SliderParent"]//div[1]//div[2]//div[3]'
  );

  const desirableValOfSlider: number = 1500;

  //a generic function to get the current value of slider
  async function fetchSliderCurrentValue(slider: Locator) {
    return Number(await slider.getAttribute("aria-valuenow"));
  }

  while ((await fetchSliderCurrentValue(slider)) !== desirableValOfSlider) {
    if ((await fetchSliderCurrentValue(slider)) < desirableValOfSlider) {
      await slider.press("ArrowRight");
    } else {
      await slider.press("ArrowLeft");
    }
  }
});

test("Sliders - evaluating Javascript", async ({ page }) => {
  //example from Artem Bondar Udemy
  await page.goto("http://localhost:4200/pages/iot-dashboard");

  //! We can make set the attributes of a locator during a test using evaluate() method.

  const sliderbtn = page
    .locator("//*[name()='svg']//*[name()='circle' and @fill='#f7f9fc']")
    .first();

  await sliderbtn.evaluate((node) => {
    node.setAttribute("cx", "11.862664303871455");
    node.setAttribute("cy", "112.76356850287353");
  });

  await sliderbtn.click();
});