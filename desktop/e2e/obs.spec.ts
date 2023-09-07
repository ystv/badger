import { CompleteShowType } from "../src/common/types";
import { createAndUploadTestMedia, server } from "./serverAPI";
import { test } from "./desktopE2EUtils";
import * as os from "node:os";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import MockOBSWebSocket from "@bowser/testing/MockOBSWebSocket";
import { expect } from "@playwright/test";

let testShow: CompleteShowType;
let tempDir: string;

test.beforeEach(async ({ request, app: [app] }, testInfo) => {
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
  tempDir = path.join(os.tmpdir(), testInfo.title + "-" + testInfo.retry);
  await fsp.mkdir(tempDir, { recursive: true });
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
  const testFile = await fsp.readFile(
    path.join(__dirname, "testdata", "smpte_bars_15s.mp4"),
  );
  const media = await createAndUploadTestMedia(
    "continuityItem",
    testShow.continuityItems[0].id,
    "smpte_bars_15s.mp4",
    testFile,
  );
  await expect
    .poll(
      async () => {
        const med = await server.media.get.query({ id: media.id });
        return med.state;
      },
      {
        timeout: 30_000,
        intervals: [500],
      },
    )
    .toBe("Ready");

  const mows = await MockOBSWebSocket.create(expect);
  try {
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
    mows.ctx.alwaysRespond("GetSceneList", () => ({
      success: true,
      code: 100,
      data: {
        scenes: [],
        currentPreviewSceneName: "",
        currentProgramSceneName: "",
      },
    }));
    mows.ctx.alwaysRespond("GetVideoSettings", () => ({
      success: true,
      code: 100,
      data: {
        baseWidth: 1920,
        baseHeight: 1080,
        fpsNumerator: 50,
        fpsDenominator: 1,
        outputHeight: 1080,
        outputWidth: 1920,
      },
    }));
    await expect(page.getByTestId("OBSSettings.error")).not.toBeVisible();
    await expect(page.getByTestId("OBSSettings.success")).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Download" }).click();

    await expect(page.getByRole("button", { name: "Add to OBS" })).toBeVisible({
      timeout: 15_000,
    });

    const csResPromise = mows.ctx.waitForRequest("CreateScene");
    await page.getByRole("button", { name: "Add to OBS" }).click();
    const [data, res] = await csResPromise;
    expect(JSON.stringify(data, null, 2)).toMatchSnapshot();
    const ciPromise = mows.ctx.waitForRequest("CreateInput");
    await res({
      success: true,
      code: 100,
      data: undefined,
    });
    const [data2, res2] = await ciPromise;
    expect(JSON.stringify(data2, null, 2)).toMatchSnapshot();
    const ssitPromise = mows.ctx.waitForRequest("SetSceneItemTransform");
    await res2({
      success: true,
      code: 100,
      data: {
        sceneItemId: 1,
      },
    });
    const [data3, res3] = await ssitPromise;
    expect(JSON.stringify(data3, null, 2)).toMatchSnapshot();
    const gslPromise = mows.ctx.waitForRequest("GetSceneList");
    await res3({
      success: true,
      code: 100,
      data: undefined,
    });
    const [_, res4] = await gslPromise;
    const gsilPromise = mows.ctx.waitForRequest("GetSceneItemList");
    await res4({
      success: true,
      code: 100,
      data: {
        scenes: [
          {
            sceneName: "0 - Test Continuity [#1]",
          },
        ],
        currentProgramSceneName: "0 - Test Continuity [#1]",
        currentPreviewSceneName: "0 - Test Continuity [#1]",
      },
    });
    const [data5, res5] = await gsilPromise;
    expect(data5.sceneName).toBe("0 - Test Continuity [#1]");
    await res5({
      success: true,
      code: 100,
      data: {
        sceneItems: [
          {
            sourceName: "Bowser Media 1",
          },
        ],
      },
    });
    await expect(page.getByText("Good to go!")).toBeVisible({
      timeout: 15_000,
    });
  } finally {
    await mows.close();
  }
});
