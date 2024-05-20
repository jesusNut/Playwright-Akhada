import { test, Locator } from "@playwright/test";
import { DateTime } from "luxon";
import moment from "moment";

/**===============================================================
 *!    ☠️☠️  HANDLING CALENDAR & DATE PICKERS  ☠️☠️
 *================================================================**/

//?Vignesh_udemy
//? Traditional way : https://www.youtube.com/watch?v=gLK4_gRH7mY&t=8s

test("Handling Calendar - type-1, ex-1 (filling directly)", async ({
  page,
}) => {
  //? Vinesh Udemy

  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"
  );
  await page
    .locator("//input[@id='birthday']")
    .pressSequentially("20021993", { delay: 300 });
});

test("Handling Calendar - type-1, ex-2 (filling directly)", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const fetchedFrame = page.frameLocator("//iframe[@id='frame-one796456169']");
  await fetchedFrame.locator("//input[@id='RESULT_TextField-2']").click();
  await fetchedFrame
    .locator("//input[@id='RESULT_TextField-2']")
    .pressSequentially("20021993", { delay: 200 });
});

test("Handling Calendar - type-2 (appraoach 1 :using Luxon Nodejs Module) ", async ({
  page,
}) => {
  //? Vignesh Udemy : How to instal 'Luxon' module from Nodejs
  //? https://stackoverflow.com/questions/60777494/how-to-enable-node-js-code-autocompletion-in-vscode

  await page.goto("https://qa-practice.netlify.app/calendar");

  //click on the calendar placeholder to make the date picker visible
  await page.locator("//input[@id='calendar']").click();

  const currentMonthYearLocator = page.locator(
    "//div[@class='datepicker-days']//th[@class='datepicker-switch']"
  );
  const nextBtnLocator = page.locator(
    "//div[@class='datepicker-days']//th[@class='datepicker-switch']/following-sibling::th"
  );
  const prevBtnLocator = page.locator(
    "//div[@class='datepicker-days']//th[@class='datepicker-switch']/preceding-sibling::th"
  );

  const monthYearToSelect = "March 2024";
  const dayToSelect = "12";
  const formattedDate = DateTime.fromFormat(monthYearToSelect, "MMMM yyyy");

  console.log(formattedDate);

  while ((await currentMonthYearLocator.textContent()) != monthYearToSelect) {
    await page.pause();
    if (formattedDate < DateTime.now()) {
      await prevBtnLocator.click();
    } else {
      await nextBtnLocator.click();
    }
  }

  //now select the date
  await page
    .locator("//div[@class='datepicker-days']//td[@class='day']")
    .filter({ hasText: dayToSelect })
    .first()
    .click();

  //!  A utility function for picking date/calendar can be created {Vignesh-Udemy}
});

test("Handling Calendar - type-2 (appraoach 2 :using Moment Nodejs Module) ", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const fetchedFrame = page.frameLocator("//iframe");

  //click on the DOB calendar icon to open the date picker
  await fetchedFrame.locator("//span[@role='button']").click();

  //locator of month
  const currentMonthLocator = fetchedFrame.locator(
    "//div[@class='ui-datepicker-title']/span"
  );
  //locator of Year
  const allYearOptions = fetchedFrame.locator(
    "//select[@aria-label='Select year']/option"
  );
  let currentYearLocator: Locator | undefined = undefined;
  for (const iterator of await allYearOptions.all()) {
    const valueOfSelectedAttr = await iterator.getAttribute("selected");
    if (
      valueOfSelectedAttr === "selected" &&
      !Object.is(valueOfSelectedAttr, null)
    ) {
      currentYearLocator = iterator;
    }
  }
  //fetching texts of month and year locator to form a current month-year
  const getcurrentMonthYearTextValue = async function () {
    return (
      (await currentMonthLocator.textContent()) +
      " " +
      (await currentYearLocator?.textContent())
    );
  };

  const dayToSelect = "18";
  const monthToSelect = "March";
  const yearToSelect = "2024";
  const monthYearToSelect: string = monthToSelect + " " + yearToSelect;

  const formattedMonthYearToSelect = moment(monthYearToSelect, "MMMM YYYY"); //Moment<1993-10-01T00:00:00+05:30>
  const thisMonthYear = formattedMonthYearToSelect.isBefore();

  //logic to click on previous or next button in date-picker to find the required month-year
  while (monthYearToSelect != (await getcurrentMonthYearTextValue())) {
    if (thisMonthYear) {
      await fetchedFrame.locator("//a[@title='Prev']").click();
    } else {
      await fetchedFrame.locator("//a[@title='Next']").click();
    }
  }

  //select the correct date
  await fetchedFrame
    .locator("//table[@class='ui-datepicker-calendar']/tbody/tr/td/a")
    .filter({ hasText: dayToSelect })
    .click();
});
