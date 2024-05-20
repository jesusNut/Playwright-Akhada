import { test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING UPLOAD  ☠️☠️
 *================================================================**/

 //? Udemy -Vignesh
 //? https://www.youtube.com/watch?v=HX4u8oorxyc&list=PL_y_9mKKBjhSP8c2cPscO_aNlWCCxe0wr&index=32

test("Handling upload with input tag with attr. type = file, SINGLE UPLOAD", async ({
  page,
}) => {
  //! There are 2 ways to handle this type of uploads

  await page.goto(
    "https://www.lambdatest.com/selenium-playground/upload-file-demo"
  );

  //! Way 1:
  //await page.locator('//input[@id="file"]').setInputFiles('./files_to_upload/img1.jpg');

  //! Way 2:

  //1. Handle the event first for upload.
  //2. Trigger the event the is responsible to upload files (open the window pop up where we select files)
  const [filechooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    await page.locator('//input[@id="file"]').click(),
  ]);
  await filechooser.setFiles("./files_to_upload/img2.jpg");

  //! check if this type of upload is multiple or not
  console.log(filechooser.isMultiple());
});

test("Handling upload with input tag with attr. type = file, MULTIPLE UPLOAD", async ({
  page,
}) => {
  //! There are 2 ways to handle this type of uploads

  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

  //! Way 1:
  // await page.locator('//input[@name="files[]"]').setInputFiles(['./files_to_upload/img1.jpg','./files_to_upload/img2.jpg']);

  //! Way 2:

  //1. Handle the event first for upload.
  //2. Trigger the event the is responsible to upload files (open the window pop up where we select files)
  const [filechooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    await page.locator('//input[@name="files[]"]').click(),
  ]);
  await filechooser.setFiles([
    "./files_to_upload/img1.jpg",
    "./files_to_upload/img2.jpg",
  ]);

  //! check if this type of upload is multiple or not
  console.log(filechooser.isMultiple());
});

test("Handling upload withOUT input tag with attr. type = file, MULTIPLE UPLOAD", async ({
  page,
}) => {
  //! There is ONLY ONE way to handle this type of upload - USING events

  await page.goto("http://autopract.com/selenium/upload2/");

  //! ONLY Way :

  //1. Handle the event first for upload.
  //2. Trigger the event the is responsible to upload files (open the window pop up where we select files)

  const [filechooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    await page.locator('//a[@id="pickfiles"]').click(),
  ]);
  await filechooser.setFiles([
    "./files_to_upload/img1.jpg",
    "./files_to_upload/img2.jpg",
  ]);

  //! check if this type of upload is multiple or not
  console.log(filechooser.isMultiple());
});
