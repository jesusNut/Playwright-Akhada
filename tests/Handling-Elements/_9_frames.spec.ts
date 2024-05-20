import { test } from "@playwright/test";

/**=======================================================================
 *!    ☠️☠️  HANDLING Frames & Iframes (same concept to handle) ☠️☠️
 *=======================================================================**/

test("Handling frames directly : using frameLocator() method", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");

  //DIRECTLY locate the frame using frameLocator() method [without fetching the frame exclusively]
  const frameLocator = page.frameLocator("//iframe[@id='mce_0_ifr']");

  //navigate elements inside the frame as usual.
  const textboxInsideFrame = frameLocator.locator("body");

  //find & print the pre-filled text.
  console.log(await textboxInsideFrame.locator("p").textContent());

  //to clear pre-filled text
  await textboxInsideFrame.fill("");

  //to enter the new text
  await textboxInsideFrame.fill("Thakur is the best !!!");
});

test("Finding number of frames - frames() method", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  //find total number of frames on a page.
  const allFrames = page.frames(); //fetch all frames attached to a page.
  console.log(`Total nubers of frames are ${allFrames.length}`);
});

test("Fetching/getting frames out of a page & then interacting with frame objects - frame() method", async ({
  page,
}) => {
  await page.goto(
    "https://www.globalsqa.com/demo-site/frames-and-windows/#iFrame"
  );

  //!🤡 Get frame using the frame's name attribute
  // const fetchedFrame1 = page.frame("globalSqa"); //way 1
  const fetchedFrame1 = page.frame({ name: "globalSqa" }); //way 2
  await fetchedFrame1?.locator("//input[@id='s']").fill("Abhishek");

  await page.goto(
    "https://chercher.tech/practice/frames-example-selenium-webdriver"
  );

  //!🤡 Get frame using the frame's URL attribute
  const fetchedFrame2 = page.frame({
    url: "https://chercher.tech/practice/frames1.html",
  });
  await fetchedFrame2?.locator("//input[@type='text']").fill("Abhishek");
});

test("Nested frames - childFrames() method - example 1", async ({ page }) => {
  await page.goto(
    "https://chercher.tech/practice/frames-example-selenium-webdriver"
  );

  //get the parent frame
  const parentFrame = page.frame({
    url: "https://chercher.tech/practice/frames1.html",
  });
  //get the child frames in form of array
  const childFrames = parentFrame?.childFrames();

  console.log(
    "Total numbers of child frames in parent frame is : " + childFrames?.length
  );

  //check the checkbox []as a best practice try to use force : true]

  await childFrames?.[0].locator("//input[@id='a']").check({ force: true });
});

test("Nested frames - childFrames() method - example 2", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  //get the parent frame
  const parentFrame = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_3.html",
  });
  //get the child frames in form of array
  const childFrames = parentFrame?.childFrames();

  console.log(
    "Total numbers of child frames in parent frame is : " + childFrames?.length
  );

  //check the checkbox []as a best practice try to use force : true]

  await childFrames?.[0].locator('//div[@id="i11"]').check({ force: true });
  await childFrames?.[0].getByLabel("Other response").fill("Abhishek");

  //once the child frame checkbox is handled, then again do something in parent frame

  await parentFrame?.locator("//input[@name='mytext3']").fill("Murari");
});


/**==========================================================================================
 *!    ☠️☠️  Using PICK LOCATOR functionality to pick elements inside frames/iframes ☠️☠️

 //? https://www.youtube.com/watch?v=82n8bSpDCQg&list=PL83cimSRP5ZmwhC6u255huRwSi9tlP-nc&index=21
 *===========================================================================================**/