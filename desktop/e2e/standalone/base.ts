import {
  test as base,
  _electron as electron,
  expect,
  type ElectronApplication,
  type Page,
} from "@playwright/test";

const MICRO_SERVER_PORT = process.env.MICRO_SERVER_PORT
  ? parseInt(process.env.MICRO_SERVER_PORT, 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8594;
const MICRO_SERVER_PASSWORD = "microserver";

const test = base.extend<{
  scenario: string;
  app: [ElectronApplication, Page];
}>({
  scenario: "default",
  // eslint-disable-next-line no-empty-pattern
  app: async ({ scenario }, use, testInfo) => {
    const app = await electron.launch({
      args: ["--enable-logging", "out/main/index.js"],
      env: {
        ...process.env,
        NODE_ENV: "test",
        E2E_TEST: "true",
        __USE_MOCK_VMIX: "true",
      },
    });

    expect(
      app.evaluate(({ ipcMain }) => ipcMain.emit("resetTestSettings")),
    ).not.toBe(false);

    const win = await app.firstWindow();

    await win.context().tracing.start({ screenshots: true, snapshots: true });

    await win.waitForLoadState("domcontentloaded");

    await win
      .getByLabel("Server address")
      .fill(`http://localhost:${MICRO_SERVER_PORT}/${scenario}`);
    await win.getByLabel("Server Password").fill(MICRO_SERVER_PASSWORD);

    await win.getByRole("button", { name: "Connect" }).click();

    await expect(
      win.getByRole("heading", { name: "Select a show" }),
    ).toBeVisible();

    await use([app, win]);

    await win
      .context()
      .tracing.stop({ path: `traces/${testInfo.title}-${testInfo.retry}.zip` });

    await win.close();
    await app.close();
  },
});

export { test, expect };
