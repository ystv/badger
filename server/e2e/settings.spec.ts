import { test, expect } from "./lib";

test("Settings page works", async ({ page }) => {
  await page.goto("/settings");

  await page.getByLabel("Default Description").fill("Test");
  await page.getByLabel("Default Resolution").selectOption("2160p");
  await page.getByRole("button", { name: "Save" }).click();

  // Ensure it sticks after a reload
  await page.reload();
  await expect(
    page.getByLabel("Default Description").inputValue(),
  ).resolves.toBe("Test");
  await expect(
    page.getByLabel("Default Resolution").inputValue(),
  ).resolves.toBe("2160p");
});
