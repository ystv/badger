import { Page } from "@playwright/test";
import { test as base, expect } from "../../testUtils";
import { createShow } from "@/e2e/lib";

const test = base.extend<{
  testPage: Page;
}>({
  testPage: async ({ page }, use) => {
    await createShow(page, "Test Show");

    await use(page);
  },
});

test.beforeEach(async ({ request }) => {
  await request.post(
    "/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB",
  );
});

test("ping", async ({ live, micro }) => {
  expect(await micro("ping", "get")).toMatchObject(await live("ping", "get"));
});
