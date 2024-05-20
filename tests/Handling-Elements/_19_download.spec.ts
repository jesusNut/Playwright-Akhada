import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING DOWNLOAD  ☠️☠️
 *================================================================**/

//? Udemy : Vignesh [Concept]
//? https://www.youtube.com/watch?v=A2xW7Eb7RfQ [save at desired location withing project]

//Steps involved:

//1. Write an event to keep waiting for a downoad event.
//2. Click on the download button which starts actual download
//3. Save the downloaded file at location of your choice.

test("Example-1 : Concept of Download handling", async ({ page }) => {
  await page.goto("https://filesamples.com/formats/jpeg");

  //  🤓 'const [download]' is array destructuring concept.
  const [download] = await Promise.all([
    //handle the downloading event
    page.waitForEvent("download"),
    //event which triggers downloading:
    await page.locator('//div[@class="output"]//div[1]//a[1]').click(),
  ]);

  //! 1. Saving the file in our root directory location with default (PW suggested) filename.

  //   const filename = download.suggestedFilename();
  //   await download.saveAs(filename);

  //! 2. Saving the file in our 'root-directory/downloads' location with default (PW suggested) filename.

  const filename2 = "abhishek_file.jpeg";
  await download.saveAs("./downloads/" + filename2);
});

test("Example-2", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo"
  );

  //  🤓 'const [download]' is array destructuring concept.
  const [download] = await Promise.all([
    //handle the downloading event
    page.waitForEvent("download"),
    await page
      .locator('//textarea[@id="textbox"]')
      .pressSequentially("I will not quit ever ..love, Abhishek"),
    await page.locator('//button[@id="create"]').click(),
    await page.locator('//a[@id="link-to-download"]').click(),
  ]);

  //!  Saving the file in our 'root-directory/downloads' location with default (PW suggested) filename.

  const filename2 = "abhishek_file.txt";
  await download.saveAs("./downloads/" + filename2);
});

test("Example-3 : Handling two downloads", async ({ page }) => {
  //In this example, we will handle two download buttons.
  await page.goto("https://filesamples.com/formats/jpeg");

  // HANDLING FIRST DOWNLOAD BUTTON:

  const [download] = await Promise.all([
    //handle the downloading event
    page.waitForEvent("download"),
    //event which triggers downloading:
    await page.locator('//div[2]//a[1]').click(),
  ]);

  //! Saving the FIRST downloaded file in our 'root-directory/downloads' location with default (PW suggested) filename.

  const filename1 = "abhishek_file.jpeg";
  await download.saveAs("./downloads/" + filename1);

  // HANDLING SECOND DOWNLOAD BUTTON:

  const [download2] = await Promise.all([
    //handle the downloading event
    page.waitForEvent("download"),
    //event which triggers downloading:
    await page.locator("//div[2]//a[1]").click(),
  ]);

  //! Saving the SECOND downloaded file in our 'root-directory/downloads' location with default (PW suggested) filename.

  const filename2 = "abhishek_file1.jpeg";
  await download2.saveAs("./downloads/" + filename2);
});
