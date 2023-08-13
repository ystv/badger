import { test, expect } from "@playwright/test";

test("loads", async ({ page }) => {
  await page.goto("http://localhost:3000/shows");

  await expect(page.getByRole("heading", { name: "Shows" })).toBeVisible();
});

test("create show", async ({ page }) => {
  await page.goto("http://localhost:3000/shows");
  await page.getByRole("button", { name: "New Show" }).click();
  await page.getByLabel("Name").fill("Test Show");
  await page.getByLabel("Start").click();
  await page.getByText("27").click();
  await page.getByLabel("Start").click();
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("heading", { name: "Test Show" })).toBeVisible();
});
