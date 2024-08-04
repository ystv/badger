import { test, expect } from "./base";

test("it works", async ({ app: [_, page] }) => {
  await page.getByText("Test show").click();
});

test.describe("big show", () => {
  test.use({ scenario: "big-show" });
  test("scrolling for a show with lots of rundown items", async ({
    app: [_, page],
  }) => {
    await page.getByRole("button", { name: "Select" }).click();

    await page.getByText("Continuity", { exact: true }).click();
    await page.getByRole("menuitem", { name: "Test Rundown" }).click();

    await page
      .getByRole("cell", { name: "Test Item 40" })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("cell", { name: "Test Item 40" }),
    ).toBeInViewport();
  });
});
