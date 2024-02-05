import { expect } from "@playwright/test";
import { test, getAPIClient } from "./lib";

test.beforeEach(async () => {
  const api = getAPIClient();
  await api.metaFields.put.mutate([
    {
      name: "Test Text on Shows",
      target: "Show",
      type: "Text",
      default: true,
    },
    {
      name: "Test Non-Default",
      target: "Show",
      type: "Text",
      default: false,
    },
    // {
    //   name: "Media",
    //   target: "Show",
    //   type: "Media",
    //   default: false,
    // },
  ]);
});

test("Text fields", async ({ showPage: page }) => {
  await page.getByLabel("Test Text on Shows").fill("Test");
  const req = page.waitForRequest("/shows/**");
  await page.getByTestId("MetaValue.save").click();
  await req;
  await expect(
    page.getByLabel("Test Text on Shows").inputValue(),
  ).resolves.toBe("Test");
});

test("Non-default", async ({ showPage: page }) => {
  await page.getByRole("button", { name: "Add extra show details " }).click();
  await page.getByRole("menuitem", { name: "Test Non-Default" }).click();
  await page.getByLabel("Test Non-Default").fill("Test 2");
  const req = page.waitForRequest("/shows/**");
  await page.getByTestId("MetaValue.save").click();
  await req;
  await expect(page.getByLabel("Test Non-Default").inputValue()).resolves.toBe(
    "Test 2",
  );
});
