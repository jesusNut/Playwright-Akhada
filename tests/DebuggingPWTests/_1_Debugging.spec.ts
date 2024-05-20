import { test, expect } from "@playwright/test";

//todo::  https://www.youtube.com/watch?v=rhzrFiKfWwY
//todo::  https://www.youtube.com/watch?v=V5eIsWi14Ok&t=167s


/**========================================================================
 *!    ☠️☠️  Debugging in Headed mode as flags in CMD commands☠️☠️
 //?   npx playwright test -g 'Debugging in Headed Mode using flags' --project chromium --headed : OPENS only BROWSER WINDOW OF TEST
 //?   npx playwright test -g 'Debugging in Headed Mode using flags'  --project chromium --debug  : OPENS PW Inspector + BROWSER WINDOW OF TEST    
 //?   npx playwright test -g 'Debugging in Headed Mode using flags'  --project chromium --ui : OPENS UI Mode  
 
 *!    ☠️☠️  Debugging in Headed mode as page.pause()☠️☠️
 //?   npx playwright test -g 'Debugging in Headed Mode using page.pause()' --headed --project chromium : OPENS PW Inspector + BROWSER WINDOW OF TEST
 //?   npx playwright test -g 'Debugging in Headed Mode using page.pause()'  --project chromium --ui --headed : OPENS PW Inspector + UI Mode +BROWSER WINDOW OF TEST
 
 *!    ☠️☠️  Debugging in Headed mode using VS Code ☠️☠️
 *=========================================================================**/

//*🥴 use the CMD commands in the note to debug the below test 🥴
test("Debugging in Headed Mode using flags", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('//input[@id="username"]');
    const password = page.locator('//input[@id="password"]');
    const userRadio = page.locator("//label[2]//span[2]");
    const tcChkbox = page.locator('//input[@id="terms"]');
    const signinBtn = page.locator('//input[@id="signInBtn"]');
  
    //actions
    await username.fill("rahulshettyacademy");
  
    //! put a debug point
    await page.pause();
    await password.fill("learning");
    await userRadio.check();
    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
    await page.locator('//button[@id="okayBtn"]').click();
    await tcChkbox.check();
    await signinBtn.click();
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/angularpractice/shop"
    );
  });
test("Debugging in Headed Mode using page.pause()", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator('//input[@id="username"]');
  const password = page.locator('//input[@id="password"]');
  const userRadio = page.locator("//label[2]//span[2]");
  const tcChkbox = page.locator('//input[@id="terms"]');
  const signinBtn = page.locator('//input[@id="signInBtn"]');

  //actions
  await username.fill("rahulshettyacademy");

  //! put a debug point
  await page.pause();
  await password.fill("learning");
  await userRadio.check();
  await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
  await page.locator('//button[@id="okayBtn"]').click();
  await tcChkbox.check();
  await signinBtn.click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop"
  );
});
