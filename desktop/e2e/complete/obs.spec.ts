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
