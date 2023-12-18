import { expect } from "@playwright/test";
import { test } from "./desktopE2EUtils";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { directlyCreateTestMedia, server } from "./serverAPI";
import type { CompleteShowType } from "../../src/common/types";
import * as os from "os";
import type VMixConnection from "../../src/main/vmix/vmix";

let testShow: CompleteShowType;
let tempDir: string;

test.beforeEach(async ({ request, app: [app] }, testInfo) => {
  await request.post(
    "http://localhost:3000/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB",
  );
  testShow = await server.shows.create.mutate({
    name: "Test Show",
    start: new Date("2026-01-01T19:00:00Z"),
    rundowns: {
      create: {
        name: "Test Rundown",
        order: 0,
        items: {
          create: {
            type: "VT",
            name: "Test Item",
            durationSeconds: 0,
            order: 0,
          },
        },
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

test.use({
  appEnv: {
    __USE_MOCK_VMIX: "true",
  },
});

declare global {
  // NB: these don't actually exist on "our" global, only inside the app (using `app.evaluate()`)
  // they're declared here to make typescript happy without needing to put `as any` everywhere

  /* eslint-disable no-var */
  var __MOCK_VMIX: (
    cb: (
      when: typeof import("strong-mock").when,
      vmix: VMixConnection,
      It: typeof import("strong-mock").It,
    ) => void,
  ) => void;
  var __MOCK_VMIX_RESET: () => void;
  var __MOCK_VMIX_VERIFY: () => void;
  /* eslint-enable no-var */
}

test.afterEach(async ({ app: [app] }) => {
  await app.evaluate(() => {
    globalThis.__MOCK_VMIX_RESET();
  });
});

test("load into vMix", async ({ app: [app, page] }) => {
  test.slow();
  const testMedia = await directlyCreateTestMedia(
    "smpte_bars_15s.mp4",
    await fsp.readFile(__dirname + "/../testdata/smpte_bars_15s.mp4"),
    "rundownItem",
    testShow.rundowns[0].items[0].id,
  );

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

  await page.getByRole("button", { name: "Download" }).click();

  await app.evaluate((_, testMediaPath) => {
    globalThis.__MOCK_VMIX((when, vmix, It) => {
      when(() => vmix.getFullState())
        .thenResolve({
          version: "26",
          edition: "4k",
          inputs: [],
        })
        .once();
      when(() => vmix.addInput("VideoList", It.isString())).thenResolve("123");
      when(() => vmix.renameInput("123", It.isString())).thenResolve();
      when(() => vmix.clearList("123")).thenResolve();
      when(() => vmix.addInputToList("123", It.isString())).thenResolve();
      when(() => vmix.getFullState()).thenResolve({
        version: "26",
        edition: "4k",
        inputs: [
          {
            key: "123",
            number: 1,
            type: "VideoList",
            title: "VTs - smpte_bars_15s.mp4",
            shortTitle: "VTs",
            state: "Paused",
            position: 0,
            duration: 0,
            loop: false,
            selectedIndex: 1,
            items: [
              {
                source: testMediaPath,
                selected: true,
              },
            ],
          },
        ],
      });
    });
  }, `${tempDir}/smpte_bars_15s (#${testMedia.id}).mp4`);

  await expect(page.getByText("Ready for load")).toBeVisible();
  await page.getByRole("button", { name: "Load All VTs" }).click();

  await expect(page.getByText("Good to go!")).toBeVisible();
});
