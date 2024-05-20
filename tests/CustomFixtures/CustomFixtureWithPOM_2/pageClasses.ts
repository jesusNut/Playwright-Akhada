import { Page } from "@playwright/test";

export class GoogleMainPage {
  constructor(private readonly page: Page) {}
  async launchPrivacyPage() {
    await this.page.goto("https://google.co.in");
    await this.page.locator('//a[normalize-space()="Privacy"]').click();
  }
}

export class PrivacyPage {
  constructor(private readonly page: Page) {}
  async checkPrivacyControls() {
    await this.page.waitForTimeout(4000);
    await this.page
      .locator(
        '//a[@class="bCzwPe"][normalize-space()="Your privacy controls"]'
      )
      .click();
  }
}
