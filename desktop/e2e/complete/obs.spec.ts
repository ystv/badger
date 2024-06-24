import { CompleteShowType } from "../../src/common/types";
import { createAndUploadTestMedia, server } from "./serverAPI";
import { test } from "./desktopE2EUtils";
import * as os from "node:os";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import MockOBSWebSocket from "@badger/testing/MockOBSWebSocket";
import { expect } from "@playwright/test";

let testShow: CompleteShowType;
let tempDir: string;

test.beforeEach(async ({ request, app: [app] }, testInfo) => {
  await request.post(
    "http://localhost:3000/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB",
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
    path.join(__dirname, "..", "testdata", "smpte_bars_15s.mp4"),
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

  const mows = await MockOBSWebSocket.create(expect, async (obs) => {
    obs.alwaysRespond("GetVersion", () => ({
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
    obs.alwaysRespond("GetSceneList", () => ({
      success: true,
      code: 100,
      data: {
        scenes: [],
        currentPreviewSceneName: "",
        currentProgramSceneName: "",
        currentPreviewSceneUuid: "",
        currentProgramSceneUuid: "",
      },
    }));
    obs.alwaysRespond("GetVideoSettings", () => ({
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

    const [createSceneData, respondCreateScene] =
      await obs.waitForRequest("CreateScene");
    expect(createSceneData.sceneName).toBe(
      "0 - Test Continuity [Continuity #1]",
    );
    await respondCreateScene({
      success: true,
      code: 100,
      data: {
        sceneUuid: "",
      },
    });

    const [createInputData, respondCreateInput] =
      await obs.waitForRequest("CreateInput");
    expect(createInputData.sceneName).toBe(
      "0 - Test Continuity [Continuity #1]",
    );
    expect(createInputData.inputName).toBe("Badger Media 1");
    await respondCreateInput({
      success: true,
      code: 100,
      data: {
        sceneItemId: 1,
        inputUuid: "",
      },
    });

    const [_2, respondSSIT] = await obs.waitForRequest("SetSceneItemTransform");
    await respondSSIT({
      success: true,
      code: 100,
      data: undefined,
    });

    const [_, respondGetSceneList] = await obs.waitForRequest("GetSceneList");
    await respondGetSceneList({
      success: true,
      code: 100,
      data: {
        scenes: [
          {
            sceneName: "0 - Test Continuity [Continuity #1]",
          },
        ],
        currentProgramSceneName: "0 - Test Continuity [Continuity #1]",
        currentPreviewSceneName: "0 - Test Continuity [Continuity #1]",
        currentPreviewSceneUuid: "",
        currentProgramSceneUuid: "",
      },
    });

    const [dataGetSceneItemList, respondGetSceneItemList] =
      await obs.waitForRequest("GetSceneItemList");
    expect(dataGetSceneItemList.sceneName).toBe(
      "0 - Test Continuity [Continuity #1]",
    );
    await respondGetSceneItemList({
      success: true,
      code: 100,
      data: {
        sceneItems: [
          {
            sourceName: "Badger Media 1",
          },
        ],
      },
    });
  });
  try {
    await page.getByRole("button", { name: "Select" }).click();

    await page.getByLabel("Settings").click();
    await page.getByRole("tab", { name: "OBS" }).click();
    await page.getByLabel("OBS Host").fill("localhost");
    await page.getByLabel("OBS WebSocket Port").fill(mows.port.toString());
    await page.getByLabel("OBS WebSocket Password").fill("aaa");

    await page.getByRole("button", { name: "Connect" }).click();
    await mows.waitForConnection;

    await expect(page.getByTestId("OBSSettings.error")).not.toBeVisible();
    await expect(page.getByTestId("OBSSettings.success")).toBeVisible();
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Download", exact: true }).click();

    await expect(
      page.getByRole("button", { name: "Load", exact: true }),
    ).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole("button", { name: "Load", exact: true }).click();

    await expect(page.getByText("Good to go!")).toBeVisible({
      timeout: 15_000,
    });
  } finally {
    await mows.close();
  }
});
