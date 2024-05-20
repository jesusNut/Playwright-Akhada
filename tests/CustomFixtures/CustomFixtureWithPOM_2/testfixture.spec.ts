import { test } from "./customFixture";

test("understanding how custom page fixtures work with Page objects", async ({
  fixture2,
  fixture1,
}) => {
  await fixture1.launchPrivacyPage();
  await fixture2.checkPrivacyControls();
});
