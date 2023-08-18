import { test as base, expect, Page, request } from "@playwright/test";

const test = base.extend<{ showPage: Page }>({
  showPage: async ({ page, request }, use) => {
    await request.post("/api/resetDBInTestsDoNotUseOrYouWillBeFired");

    await page.goto("/shows/create");
    await page.getByLabel("Name").fill("Test Show");
    await page.getByLabel("Start").click();
    await page.getByText("27").click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.getByRole("heading", { name: "Test Show" }),
    ).toBeVisible();

    await use(page);
    await request.post("/api/resetDBInTestsDoNotUseOrYouWillBeFired");
  },
});

test("add item to show", async ({ showPage }) => {
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:00");

  await showPage.getByRole("button", { name: "Rundown" }).click();
  await showPage.getByLabel("Name").fill("Test Rundown");
  await showPage.getByRole("button", { name: "Create" }).click();
  const table = await showPage.getByTestId("ShowItemsList.itemsTable");
  await expect(table.locator("tr")).toHaveCount(1);
});
