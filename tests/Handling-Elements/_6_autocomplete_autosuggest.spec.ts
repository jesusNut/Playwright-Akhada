import { expect, test } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  HANDLING AUTOCOMPLETE/AUTO-SUGGESTION  ☠️☠️
 *================================================================**/

test("Autocomplete/Auto-Suggestion box : example 1", async ({ page }) => {
  await page.goto("https://www.amazon.in/");

  const searchString: string = "dell";

  await page
    .locator("//input[@id='twotabsearchtextbox']")
    .pressSequentially(searchString, { delay: 100 });

  await page
    .locator("//div[@class='left-pane-results-container']/div/div")
    .filter({ has: page.getByLabel("dell mouse") })
    .click();
});

test("Autocomplete/Auto-Suggestion box : example 2", async ({ page }) => {
  await page.goto("https://www.redbus.in/");

  await page
    .locator("//input[@id='src']")
    .pressSequentially("Delhi", { delay: 100 });

  const listOfSuggestion = page.locator(
    "//div[@id='autoSuggestContainer']/div/div/div/div/ul"
  );

  //wait for the list to be visible
  await listOfSuggestion.waitFor({ state: "visible" });

  //check how many options are there in list
  console.log(await listOfSuggestion.locator("//li/div/text").count());

  //click on suggestion which has text : 'Mayur Vihar'
  await listOfSuggestion
    .locator("//li/div/text")
    .filter({ hasText: "Mayur Vihar" })
    .click();
});

test("Autocomplete/Auto-Suggestion box : example 3", async ({ page }) => {
  const seachValue = "ind";
  const selectValue = "Indonesia";
  await page.goto(
    "https://alphagov.github.io/accessible-autocomplete/examples/"
  );

  await page.locator("//input[@id='autocomplete-default']").fill(seachValue);

  //wait to see that the 'ul' actually is attached to the DOM before clicking on the required suggestion.
  //wait to see that the 'ul' actually have one or more autosuggestion (child li tags) before clicking on the required suggestion.

  await expect(
    page.locator("//ul[@id='autocomplete-default__listbox']")
  ).toBeAttached({ attached: true });

  expect(
    await page.locator("//ul[@id='autocomplete-default__listbox']/li").count()
  ).toBeGreaterThanOrEqual(1);

  await page.waitForTimeout(5000);

  //click on the required suggestion

  await page
    .locator("//ul[@id='autocomplete-default__listbox']/li")
    .filter({ hasText: selectValue })
    .click();
});
