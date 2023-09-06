/* eslint-disable no-empty-pattern */
import {
  test as base,
  _electron as electron,
  expect,
  type ElectronApplication,
  type Page,
} from "@playwright/test";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { createAndUploadTestMedia, server } from "./serverAPI";
import { CompleteShowType } from "../src/common/types";
import type { Operation } from "@trpc/client";
import * as os from "node:os";

// Copied from mediaManagement.ts since importing it breaks the test
function getMediaPath() {
  switch (os.platform()) {
    case "win32":
      return "C:\\bowser_media";
    case "darwin":
      return `${os.userInfo().homedir}/Movies/Bowser Media`;
    case "linux":
      return `${os.userInfo().homedir}/Videos/Bowser Media`;
    default:
      throw new Error("Unsupported platform");
  }
}

const test = base.extend<{
  app: [ElectronApplication, Page];
}>({
  app: async ({}, use) => {
    const app = await electron.launch({ args: [".vite/build/main.js"] });
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

test("can select newly created show", async ({ app: [_app, page] }) => {
  const row = page.getByRole("listitem").filter({ hasText: "Test Show" });
  expect(row).toBeVisible();
  const btn = row.getByRole("button", { name: "Select" });
  await btn.click();
  await expect(page.getByRole("button", { name: "Test Show" })).toBeVisible();
});

test("download media", async ({ app: [app, page] }) => {
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
      },
    )
    .toBe("Ready");

  // TODO: OBS testing isn't implemented yet so the UI won't display the continuity
  // items list. Instead we trigger the download manually through the IPC API,
  // to test the downloading itself.
  await app.evaluate(({ ipcMain, webContents }, id) => {
    ipcMain.emit(
      "electron-trpc",
      { sender: webContents, senderFrame: { routingId: null } },
      {
        method: "request",
        operation: {
          id: 4, // chosen by fair dice roll, guaranteed to be random
          type: "mutation",
          path: "media.downloadMedia",
          context: {},
          input: {
            id: id,
          },
        } satisfies Operation,
      },
    );
  }, media.id);

  const expectedPath = path.join(
    getMediaPath(),
    `smpte_bars_15s (#${media.id}).mp4`,
  );
  await expect
    .poll(async () => {
      try {
        return await fsp.stat(expectedPath);
      } catch (e) {
        return null;
      }
    })
    .toBeTruthy();
});
