import {
  test as base,
  _electron as electron,
  expect,
  type ElectronApplication,
  type Page,
} from "@playwright/test";

export const test = base.extend<{
  appEnv: Record<string, string>;
  app: [ElectronApplication, Page];
}>({
  appEnv: {},

  // eslint-disable-next-line no-empty-pattern
  app: async ({ appEnv }, use, testInfo) => {
    const app = await electron.launch({
      args: ["--enable-logging", ".vite/build/main.js"],
      env: {
        ...process.env,
        NODE_ENV: "test",
        E2E_TEST: "true",
        ...appEnv,
      },
    });
    const win = await app.firstWindow();

    await win.context().tracing.start({ screenshots: true, snapshots: true });

    await win.waitForLoadState("domcontentloaded");

    await win.getByLabel("Server address").fill("http://localhost:3000");
    await win.getByLabel("Server Password").fill("aaa");

    await win.getByRole("button", { name: "Connect" }).click();

    await expect(
      win.getByRole("heading", { name: "Select a show" }),
    ).toBeVisible();

    await use([app, win]);

    await win
      .context()
      .tracing.stop({ path: `traces/${testInfo.title}-${testInfo.retry}.zip` });

    await expect(
      app.evaluate(({ ipcMain }) => ipcMain.emit("resetTestSettings")),
    ).not.toBe(false);

    await win.close();
    await app.close();
  },
});
