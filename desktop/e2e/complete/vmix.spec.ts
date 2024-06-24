import { expect } from "@playwright/test";
import { test } from "./desktopE2EUtils";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import {
  createAndUploadTestMedia,
  directlyCreateTestMedia,
  loadServerEnvVars,
  server,
} from "./serverAPI";
import type { CompleteShowType } from "../../src/common/types";
import * as os from "os";
import type VMixConnection from "../../src/main/vmix/vmix";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

test("load VTs into vMix", async ({ app: [app, page] }) => {
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

  await page.getByRole("button", { name: "Download", exact: true }).click();

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
      when(() =>
        vmix.getPartialState(`vmix/inputs/input[@shortTitle="VTs"]`),
      ).thenResolve({ ["@_state"]: "Paused" });
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

  await expect(page.getByText("Load", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Load All VTs" }).click();

  await expect(page.getByText("Good to go!")).toBeVisible();
});

test("load assets into vMix", async ({ app: [app, page] }) => {
  test.slow();
  // Unlike rundown/continuity items, Assets' media is non-nullable,
  // so we can't cheat like we normally do and do a direct upload.
  // So we can't use directlyCreateTestMedia here.
  // Instead, we cheat even harder.
  const env = loadServerEnvVars();

  const s3 = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  await s3.send(
    new PutObjectCommand({
      Bucket: env.STORAGE_BUCKET!,
      Key: `test_temporary/smpte_bars_15s.mp4`,
      Body: await fsp.readFile(__dirname + "/../testdata/smpte_bars_15s.mp4"),
    }),
  );

  const updated = await server.shows.update.mutate({
    id: testShow.id,
    data: {
      rundowns: {
        update: {
          where: {
            id: testShow.rundowns[0].id,
          },
          data: {
            assets: {
              create: {
                name: "Test Asset",
                category: "Test Category",
                order: 1,
                media: {
                  create: {
                    name: "smpte_bars_15s.mp4",
                    rawPath: `test_temporary/smpte_bars_15s.mp4`,
                    path: `test_temporary/smpte_bars_15s.mp4`,
                    durationSeconds: 0,
                    state: "Ready", // cheating.
                  },
                },
              },
            },
          },
        },
      },
    },
  });

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
      when(() => vmix.addInputToList("123", It.isString())).thenResolve();
      when(() => vmix.getFullState()).thenResolve({
        version: "26",
        edition: "4k",
        inputs: [
          {
            key: "123",
            number: 1,
            type: "VideoList",
            title: "Test Category - smpte_bars_15s.mp4",
            shortTitle: "Test Category",
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
  }, `${tempDir}/smpte_bars_15s (#${updated.rundowns[0].assets[0].media.id}).mp4`);

  await page
    .getByRole("button", { name: "Download All Media in Test Category" })
    .click();
  await page.getByRole("button", { name: "Expand Test Category" }).click();
  await page
    .getByRole("button", { name: "Load All Media in Test Category" })
    .click();
  await page.getByRole("menuitem", { name: "In List" }).click();

  await expect(page.getByTestId("Load Success")).toBeVisible();
});

test("load continuity items into vMix [list]", async ({ app: [app, page] }) => {
  const ts2 = await server.shows.update.mutate({
    id: testShow.id,
    data: {
      continuityItems: {
        create: {
          name: "Test Continuity",
          durationSeconds: 15,
          order: 1,
        },
      },
    },
  });

  const testFile = await fsp.readFile(
    path.join(__dirname, "..", "testdata", "smpte_bars_15s.mp4"),
  );
  const media = await createAndUploadTestMedia(
    "continuityItem",
    ts2.continuityItems[0].id,
    "smpte_bars_15s.mp4",
    testFile,
  );
  await expect
    .poll(
      async () => {
        const med = await server.media.get.query({ id: media.id });
        // eslint-disable-next-line no-console
        console.log(`Test media: ${med.state}`);
        return med.state;
      },
      {
        timeout: 30_000,
        intervals: [500],
      },
    )
    .toBe("Ready");

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
      when(() =>
        vmix.getPartialState(`vmix/inputs/input[@shortTitle="Continuity"]`),
      ).thenResolve({ ["@_state"]: "Paused" });
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
  }, `${tempDir}/smpte_bars_15s (#${media.id}).mp4`);

  await page.getByRole("button", { name: "Select" }).click();
  await expect(page.getByText("Continuity")).toBeVisible();

  await page.getByRole("button", { name: "Download All" }).click();

  await page.getByRole("button", { name: "Load All Continuity Items" }).click();

  await expect(page.getByText("Good to go!")).toBeVisible();
});
