import {
  test as base,
  expect,
  _electron as electron,
  ElectronApplication,
  Page,
} from "@playwright/test";

const test = base.extend<{
  app: [ElectronApplication, Page];
}>({
  app: async ({}, use) => {
    process.env.E2E_TEST = "true";
    const app = await electron.launch({ args: [".vite/build/main.cjs"] });
    const win = await app.firstWindow();

    await win.waitForLoadState("domcontentloaded");

    await use([app, win]);

    await expect(
      await app.evaluate(({ ipcMain }) => ipcMain.emit("resetTestSettings")),
    ).not.toBe(false);

    await win.close();
    await app.close();
  },
});

test("starts", async ({ app: [app, win] }) => {
  await expect(win.getByRole("heading", { name: "Bowser" })).toBeVisible();
});

test("can connect to server", async ({ app: [app, win] }) => {
  await win.waitForLoadState("load");
  if (await win.getByRole("heading", { name: "Select a show" }).isVisible()) {
    return;
  }

  await win.getByLabel("Server address").fill("http://localhost:3000");
  await win.getByLabel("Server Password").fill("aaa");

  await win.getByRole("button", { name: "Connect" }).click();

  await expect(
    win.getByRole("heading", { name: "Select a show" }),
  ).toBeVisible();
});
