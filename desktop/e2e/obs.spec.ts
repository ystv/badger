import { CompleteShowType } from "../src/common/types";
import { server } from "./serverAPI";
import { test } from "./desktopE2EUtils";
import * as os from "node:os";
import MockOBSWebSocket from "@bowser/testing/MockOBSWebSocket";
import { expect } from "@playwright/test";

let testShow: CompleteShowType;
let tempDir: string;

test.beforeEach(async ({ request, app: [app] }) => {
  await request.post(
    "http://localhost:3000/api/resetDBInTestsDoNotUseOrYouWillBeFired",
  );
  testShow = await server.shows.create.mutate({
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
  tempDir = os.tmpdir();
  await app.evaluate(({ ipcMain }, tempDir) => {
    ipcMain.emit(
      "setSetting",
      // IpcMainEvent object (unused)
      {},
      { key: "media", value: { mediaPath: tempDir } },
    );
  }, tempDir);
});

test("download continuity media and load into OBS", async ({
  app: [app, page],
}) => {
  const mows = await MockOBSWebSocket.create(expect);

  await test.step("connect to OBS", async () => {
    await page.getByRole("button", { name: "Select" }).click();
    await expect(page.getByRole("button", { name: "Test Show" })).toBeVisible();

    await page.getByLabel("Settings").click();
    await page.getByRole("tab", { name: "OBS" }).click();
    await page.getByLabel("OBS Host").fill("localhost");
    await page.getByLabel("OBS WebSocket Port").fill(mows.port.toString());
    await page.getByLabel("OBS WebSocket Password").fill("aaa");

    await page.getByRole("button", { name: "Connect" }).click();
    await mows.waitForConnection;
    mows.ctx.alwaysRespond("GetVersion", () => ({
      success: true,
      code: 100,
      data: {
        obsVersion: "1",
        obsWebSocketVersion: "1",
        rpcVersion: 1,
        availableRequests: [],
        platform: "test",
        platformDescription: "",
        supportedImageFormats: [],
      },
    }));
    await expect(page.getByTestId("OBSSettings.error")).not.toBeVisible();
    await expect(page.getByTestId("OBSSettings.success")).toBeVisible();
  });
});
