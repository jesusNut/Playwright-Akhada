
import { test as baseTest } from "@playwright/test";

export type TestOptions = {
  globalQaUrl: string;
};

const test = baseTest.extend<TestOptions>({
  globalQaUrl: ["", { option: true }],
});

export default test;
