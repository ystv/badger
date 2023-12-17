import { ElectronApplication, Page, expect } from "@playwright/test";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { createAndUploadTestMedia, server } from "./serverAPI";
import { CompleteShowType } from "../../src/common/types";
import * as os from "node:os";
import { test } from "./desktopE2EUtils";

let testShow: CompleteShowType;
let tempDir: string;

test.beforeEach(async ({ request, app: [app, page] }) => {
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
  tempDir = os.tmpdir();
  await app.evaluate(({ ipcMain }, tempDir) => {
    ipcMain.emit(
      "setSetting",
      // IpcMainEvent object (unused)
      {},
      { key: "media", value: { mediaPath: tempDir } },
    );
  }, tempDir);
  await page.reload();
  await page.waitForLoadState("domcontentloaded");
});

test("can select newly created show", async ({ app: [_app, page] }) => {
  const row = page.getByRole("listitem").filter({ hasText: "Test Show" });
  expect(row).toBeVisible();
  const btn = row.getByRole("button", { name: "Select" });
  await btn.click();
  await expect(page.getByRole("button", { name: "Test Show" })).toBeVisible();
});

async function downloadMedia(
  app: ElectronApplication,
  page: Page,
  media: { id: number },
) {
  // This test doesn't enable OBS so the UI won't display the continuity
  // items list. Instead we trigger the download manually through the IPC API,
  // to test the downloading itself.
  // NB: this may be fragile.
  await app.evaluate(({ ipcMain }, id) => {
    ipcMain.emit("doIPCMutation", {}, "media.downloadMedia", {
      id: id,
    });
  }, media.id);

  await expect(page.getByTestId("DownloadTrackerPopup.icon")).not.toBeVisible({
    timeout: 15_000,
  });

  await expect(async () => {
    const expectedPath = path.join(
      tempDir,
      `smpte_bars_15s (#${media.id}).mp4`,
    );
    const stats = await fsp.stat(expectedPath);
    expect(stats.isFile()).toBe(true);
    expect(stats.size).toBeCloseTo(548213, -3);
  }).toPass({
    timeout: 15_000,
    intervals: [500],
  });
}

test("download media", async ({ app: [app, page] }) => {
  test.slow();
  await page.getByRole("button", { name: "Select" }).click();
  await expect(page.getByRole("button", { name: "Test Show" })).toBeVisible();

  const testFile = await fsp.readFile(
    path.join(__dirname, "..", "testdata", "smpte_bars_15s.mp4"),
  );
  const media = await createAndUploadTestMedia(
    "continuityItem",
    testShow.continuityItems[0].id,
    "smpte_bars_15s.mp4",
    testFile,
  );

  await downloadMedia(app, page, media);
});

test("delete old media", async ({ app: [app, page] }) => {
  // Before we start, update the show to be a month ago.
  await server.shows.update.mutate({
    id: testShow.id,
    data: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  });

  // And create another show in the future so that we have something to select
  await server.shows.create.mutate({
    name: "Test Show 2",
    start: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  await page.reload();
  await page.getByRole("button", { name: "Select" }).click();
  await expect(page.getByRole("button", { name: "Test Show 2" })).toBeVisible();

  const testFile = await fsp.readFile(
    path.join(__dirname, "..", "testdata", "smpte_bars_15s.mp4"),
  );
  const media = await createAndUploadTestMedia(
    "continuityItem",
    testShow.continuityItems[0].id,
    "smpte_bars_15s.mp4",
    testFile,
  );

  await downloadMedia(app, page, media);

  // Now if we look in the media tab in settings it should let us delete it,
  // because it's in use in the current show.
  await page.getByLabel("Settings").click();
  await page.getByRole("tab", { name: "Media" }).click();
  const row = page.getByTestId(`MediaSettings.Row.${media.id}`);
  await expect(row).toBeVisible();
  await expect(row.getByText("Safe to delete")).toBeVisible();

  await page
    .getByRole("button")
    .filter({ hasText: "Delete media older than" })
    .click();
  await page.getByRole("menuitem", { name: "2 weeks" }).click();
  // Wait for it to finish
  await expect(
    page.getByRole("button").filter({ hasText: "Delete media older than" }),
  ).toBeEnabled();
  await expect(row).not.toBeVisible();

  const expectedPath = path.join(tempDir, `smpte_bars_15s (#${media.id}).mp4`);
  try {
    const stat = await fsp.stat(expectedPath);
    expect(stat.isFile).toBe(false);
  } catch (e) {
    expect((e as Error).message).toContain("ENOENT");
  }
});
