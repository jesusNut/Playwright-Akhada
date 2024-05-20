import { Page, Locator, expect } from "@playwright/test";

export class FirstPage {
  private readonly linkThatOpensSecondPage: Locator;

  constructor(private readonly page: Page) {
    this.linkThatOpensSecondPage = page.locator(
      "//app-home-page//div[@class='container']/p/a"
    );
  }

  async returnSecondPage() {
    await this.page.goto("https://conduit.bondaracademy.com/");
    const [newpage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.linkThatOpensSecondPage.click(),
    ]);
    await newpage.waitForLoadState();
    return newpage;
  }
}

export class SecondPage {
  private readonly linkOnSecondPage: Locator;
  constructor(private readonly page: Page) {
    this.linkOnSecondPage = page.locator('//img[@id="el_1593094758324_16"]');
  }
  async verifyLinkOnSecondPage() {
    await expect(this.linkOnSecondPage).toBeVisible({ timeout: 7000 });
  }
}
