import { test, expect } from "./base";

test("it works", async ({ app: [app, page] }) => {
  await page.getByText("Test show").click();
});

test.describe("big show", () => {
  test.use({ scenario: "big-show" });
  test("scrolling for a show with lots of rundown items", async ({
    app: [app, page],
  }) => {
    await app.evaluate(({ ipcMain }) => {
      ipcMain.emit("doIPCMutation", {}, "devtools.setSettings", {
        enabled: true,
      });
    });
    await app.evaluate(({ ipcMain }) => {
      ipcMain.emit("doIPCMutation", {}, "devtools.setEnabledIntegrations", [
        "obs",
        "ontime",
        "vmix",
      ]);
    });

    await page.getByRole("button", { name: "Select" }).click();

    await page.getByText("Continuity").click();
    await page.getByRole("menuitem", { name: "Test Rundown" }).click();

    await page
      .getByRole("cell", { name: "Test Item 40" })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("cell", { name: "Test Item 40" }),
    ).toBeInViewport();
  });
});
