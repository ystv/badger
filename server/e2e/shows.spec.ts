import { test, expect, createShowAPI } from "./lib";

test("loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Shows" })).toBeVisible();
});

test("create show", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "New Show" }).click();
  await page.getByLabel("Name").fill("Test Show");
  await page.getByLabel("Start").click();
  // see comment in showItems.spec.ts for an explanation
  await page.getByLabel("Go to next month").click();
  await page.getByText("15", { exact: true }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("heading", { name: "Test Show" })).toBeVisible();
});

test("backwards pagination with many past shows (BDGR-154)", async ({
  page,
}) => {
  for (let i = 0; i < 50; i++) {
    // Page size is 25 (see server/app/page.tsx)
    await createShowAPI(`Show ${i}`, i < 20 ? "future" : "past");
  }

  await page.goto("/");

  await page.getByRole("link", { name: "Include shows in the past" }).click();

  const paginator = page.getByTestId("Pagination");
  await expect(paginator).toBeVisible();
  await paginator.getByRole("button", { name: "Next" }).click();

  await expect(page.getByText("Show 49")).toBeVisible();
});
