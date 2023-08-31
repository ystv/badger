import {
  ElectronApplication,
  Page,
  test as base,
  _electron as electron,
  expect,
} from "@playwright/test";
import MockOBSWebSocket from "@bowser/testing/MockOBSWebSocket.ts";
import { api } from "./common";

const test = base.extend<{
  app: [ElectronApplication, Page];
}>({
  app: async ({}, use) => {
    const app = await electron.launch({ args: [".vite/build/main.cjs"] });
    const win = await app.firstWindow();

    await win.waitForLoadState("domcontentloaded");

    await win.getByLabel("Server address").fill("http://localhost:3000");
    await win.getByLabel("Server Password").fill("aaa");

    await win.getByRole("button", { name: "Connect" }).click();

    await expect(
      win.getByRole("heading", { name: "Select a show" }),
    ).toBeVisible();

    await use([app, win]);

    await expect(
      app.evaluate(({ ipcMain }) => ipcMain.emit("resetTestSettings")),
    ).not.toBe(false);

    await win.close();
    await app.close();
  },
});

test.beforeEach(async ({ request }) => {
  await request.post(
    "http://localhost:3000/api/resetDBInTestsDoNotUseOrYouWillBeFired",
  );
  await api.shows.create.mutate({
    name: "Test Show",
    start: new Date("2026-01-01T19:00:00Z"),
    continuityItems: {
      create: {
        name: "Test Continuity",
        durationSeconds: 0,
        order: 0,
      },
    },
  });
});

test("can connect to OBS", async ({ app: [app, win] }) => {
  const obs = await MockOBSWebSocket.create(expect, async (obs) => {
    obs.alwaysRespond("GetVersion", () => ({
      success: true,
      code: 100,
      data: {
        obsVersion: "1",
        obsWebSocketVersion: "1",
        availableRequests: [],
        supportedImageFormats: [],
        platform: "test",
        platformDescription: "",
        rpcVersion: 1,
      },
    }));
    await obs.waitUntilClosed;
  });

  await win.getByRole("button", { name: "Select" }).click();

  await expect(win.getByLabel("Settings")).toBeVisible();
  await win.getByLabel("Settings").click();

  await win.getByRole("tab", { name: "OBS" }).click();

  await win.getByLabel("OBS Host").fill("localhost");
  await win.getByLabel("OBS WebSocket Port").fill(obs.port.toString(10));
  await win.getByLabel("OBS WebSocket Password").fill("there is no password");

  await win.getByRole("button", { name: "Connect" }).click();
  await obs.waitForConnection;
  await expect(win.getByTestId("OBSSettings.error")).not.toBeVisible();
  await expect(win.getByTestId("OBSSettings.success")).toBeVisible();
});
