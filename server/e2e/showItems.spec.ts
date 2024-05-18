import { expect } from "@playwright/test";
import { readFileSync } from "fs";
import * as path from "node:path";
import { test, fileToDataTransfer, createShow, createMedia } from "./lib";

test("add, reorder, remove items", async ({ showPage }) => {
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:00; expected finish 19:30");

  await showPage.getByRole("button", { name: "New Rundown" }).click();
  await showPage.getByTestId("name-rundown").fill("Test 1");
  await showPage.getByTestId("create-rundown").click();
  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test 2");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.getByRole("button", { name: "New Rundown" }).click();
  await showPage.getByTestId("name-rundown").fill("Test 3");
  await showPage.getByTestId("create-rundown").click();
  await showPage.keyboard.press("Escape");

  const table = await showPage.getByTestId("ShowItemsList.itemsTable");
  await expect(table.locator("tr")).toHaveCount(3);

  // Test drag-and-drop without actually dragging it
  await showPage.getByTestId("dragHandle").nth(0).focus();
  await showPage.getByTestId("dragHandle").nth(0).press("Space");
  await showPage.keyboard.press("ArrowDown");
  await showPage.keyboard.press("ArrowDown");
  await showPage.keyboard.press("Space");

  await showPage.getByRole("button", { name: "Delet" }).nth(2).click();
  await showPage.getByRole("button", { name: "You sure boss?" }).click();
  await showPage.getByRole("dialog").waitFor({ state: "hidden" });

  await showPage.getByRole("button", { name: "Delet" }).nth(1).click();
  await showPage.getByRole("button", { name: "You sure boss?" }).click();
  await showPage.getByRole("dialog").waitFor({ state: "hidden" });

  await showPage.getByRole("button", { name: "Delet" }).click();
  await showPage.getByRole("button", { name: "You sure boss?" }).click();
  await showPage.getByRole("dialog").waitFor({ state: "hidden" });

  await expect(table.locator("tr")).toHaveCount(0);
});

test("add rundown items + check runtime", async ({ showPage }) => {
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:00; expected finish 19:30");

  await showPage.getByRole("button", { name: "New Rundown" }).click();
  await showPage.getByTestId("name-rundown").fill("Test 1");
  await showPage.getByTestId("create-rundown").click();
  await showPage.getByTestId("name-rundown").click();

  await showPage.getByTestId("name-rundown").fill("Test 2");
  await showPage.getByTestId("create-rundown").click();
  await showPage.getByTestId("name-rundown").click();

  await showPage.getByTestId("name-rundown").fill("Test 3");
  await showPage.getByTestId("create-rundown").click();
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("row").nth(1).getByText("Edit").click();

  await showPage.waitForLoadState("domcontentloaded");

  await showPage.getByRole("button", { name: "Add Segment" }).click();
  await showPage.getByLabel("Name").fill("Segment 1");
  await showPage.getByLabel("Duration").fill("60");
  const r1 = showPage.waitForRequest((r) => r.method() === "POST");
  await showPage.getByRole("button", { name: "Create" }).click();
  await r1;
  await expect(showPage.getByLabel("Name")).toHaveValue("");

  await showPage.getByLabel("Name").fill("Segment 2");
  await showPage.getByLabel("Duration").fill("60");
  const r2 = showPage.waitForRequest((r) => r.method() === "POST");
  await showPage.getByRole("button", { name: "Create" }).click();
  await r2;
  await expect(showPage.getByLabel("Name")).toHaveValue("");

  await showPage.getByLabel("Name").press("Escape");

  await showPage.getByRole("link", { name: "Back" }).click();
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 02:00; expected finish 19:32");
  await expect
    .soft(showPage.getByRole("row").nth(1).getByTestId("RundownRow.time"))
    .toHaveText("19:30");
  await expect
    .soft(showPage.getByRole("row").nth(1).getByTestId("RundownRow.duration"))
    .toHaveText("02:00");
  await expect
    .soft(showPage.getByRole("row").nth(2).getByTestId("RundownRow.time"))
    .toHaveText("19:32");
});

test("continuity estimated duration", async ({ showPage }) => {
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:00; expected finish 19:30");

  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test 1");
  await showPage.getByRole("textbox", { name: "duration" }).fill("10:00");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.getByTestId("name-continuity_item").click();

  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 10:00; expected finish 19:40");
});

test("add media", async ({ showPage }) => {
  test.slow();
  const testFile = readFileSync(__dirname + "/testdata/smpte_bars_15s.mp4");

  await showPage.evaluate(`window.__COMPLETE_UPLOAD_REMOVAL_DELAY = 500`);

  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("button", { name: "Media Missing" }).click();
  await showPage.getByText("Upload file").click();
  await showPage
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        showPage,
        testFile,
        "smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });
  await expect(showPage.getByText("smpte_bars_15s.mp4")).toBeVisible();

  await expect(
    showPage.getByRole("button", { name: "Good to go!" }),
  ).toBeVisible({
    timeout: 30_000,
  });
  await expect(showPage.getByText("smpte_bars_15s.mp4")).not.toBeVisible();

  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:15; expected finish 19:30");
  await expect
    .soft(showPage.getByTestId("ContinuityItemRow.duration"))
    .toHaveText("00:15");
});

test("reuse media", async ({ showPage }) => {
  test.slow();

  // Upload the media to a show in the past
  await createShow(showPage, "Test 2", "past");

  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  const itemId = parseInt(
    (await showPage
      .getByTestId("ContinuityItemRow")
      .getAttribute("data-item-id"))!,
  );
  await createMedia(
    "smpte_bars_15s.mp4",
    readFileSync(__dirname + "/testdata/smpte_bars_15s.mp4"),
    "continuityItem",
    itemId,
  );

  // Now go back to the initial test show
  await showPage.goto("/");
  await showPage.getByText("View/Edit").click();

  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test 2");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("button", { name: "Media Missing" }).click();
  await showPage.getByText("Use media from previous show").click();

  await showPage.getByText("Select show").click();
  await showPage.getByRole("option").first().click();
  await showPage.getByRole("button", { name: "Use" }).click();
  await expect(
    showPage.getByRole("button", { name: "Good to go!" }),
  ).toBeVisible();
});

test("media/assets for long rundowns", async ({ showPage }) => {
  const testFile = readFileSync(
    path.join(__dirname, "testdata", "smpte_bars_15s.mp4"),
  );
  await showPage.getByRole("button", { name: "New Rundown" }).click();
  await expect(showPage.getByTestId("name-rundown")).toBeVisible();
  await showPage.getByTestId("name-rundown").fill("Test");
  await showPage.getByTestId("create-rundown").click();
  await expect(showPage.getByLabel("Name")).toHaveValue("");
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("link", { name: "Edit" }).click();
  await showPage.waitForURL("**/shows/*/rundown/*");

  await showPage.getByRole("button", { name: "Add Segment" }).click();
  for (let i = 0; i < 15; i++) {
    await showPage.getByLabel("Name").fill("Segment " + i);
    await showPage.getByLabel("Duration").fill("60");
    await showPage.getByLabel("Duration").press("Enter");
    await expect(showPage.getByLabel("Name")).toHaveValue("");
  }

  await showPage.getByLabel("Name").press("Escape");

  await showPage.getByRole("button", { name: "Add Segment" }).click();
  await showPage.getByLabel("Name").fill("Test VT");
  await showPage.getByLabel("Type").selectOption("VT");
  await showPage.getByRole("button", { name: "Create" }).click();
  await expect(showPage.getByLabel("Name")).toHaveValue("");

  await showPage
    .getByRole("button", { name: "Media Missing" })
    .scrollIntoViewIfNeeded();
  await showPage.getByRole("button", { name: "Media Missing" }).click();
  await showPage.getByText("Upload file").click();
  await expect(
    showPage.getByText("Drop files here, or click to select"),
  ).toBeInViewport();
  await showPage
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        showPage,
        testFile,
        "smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });

  await showPage.getByRole("button", { name: "New Category" }).click();
  await showPage.getByPlaceholder("Stills").fill("Test Assets");
  await showPage.getByRole("button", { name: "Create" }).click();
  await showPage.getByRole("button", { name: "Expand Test Assets" }).click();

  await showPage
    .getByRole("button", { name: "Upload new asset" })
    .scrollIntoViewIfNeeded();
  await showPage.getByRole("button", { name: "Upload new asset" }).click();
  // assert it isn't off-screen (BDGR-89)
  await expect(showPage.getByText("Upload file")).toBeInViewport();
  await showPage.getByText("Upload file").click();
  const req = showPage.waitForRequest("http://localhost:1080/*");
  await showPage
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        showPage,
        testFile,
        "smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });
  await req;
});

test("asset upload failure (BDGR-54)", async ({ showPage }) => {
  const testFile = readFileSync(
    path.join(__dirname, "testdata", "smpte_bars_15s.mp4"),
  );
  await showPage.getByRole("button", { name: "New Rundown" }).click();
  await expect(showPage.getByTestId("name-rundown")).toBeVisible();
  await showPage.getByTestId("name-rundown").fill("Test");
  await showPage.getByTestId("create-rundown").click();
  await expect(showPage.getByLabel("Name")).toHaveValue("");
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("link", { name: "Edit" }).click();
  await showPage.waitForURL("**/shows/*/rundown/*");

  await showPage.getByRole("button", { name: "New Category" }).click();
  await showPage.getByPlaceholder("Stills").fill("Test Assets");
  await showPage.getByRole("button", { name: "Create" }).click();
  await showPage.getByRole("button", { name: "Expand Test Assets" }).click();

  await showPage.getByRole("button", { name: "Upload new asset" }).click();
  await showPage.getByText("Upload file").click();
  const req = showPage.waitForRequest("http://localhost:1080/*");
  await showPage
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        showPage,
        testFile,
        // This triggers LoadAssetJob to fail - see jobrunner/src/jobs/LoadAssetJob.ts
        "__FAIL__smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });
  await req;

  await showPage.getByRole("button", { name: "Expand Test Assets" }).click();
  await expect(showPage.getByTestId("RundownAssets.loadFailed")).toBeVisible({
    timeout: 30_000,
  });
});

test("media archival", async ({ showPage }) => {
  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  const itemId = parseInt(
    (await showPage
      .getByTestId("ContinuityItemRow")
      .getAttribute("data-item-id"))!,
  );
  await createMedia(
    "smpte_bars_15s.mp4",
    readFileSync(__dirname + "/testdata/smpte_bars_15s.mp4"),
    "continuityItem",
    itemId,
  );

  await showPage.goto("/media");

  await showPage.getByLabel("Select", { exact: true }).click();
  await showPage.getByRole("button", { name: "Archive Selected" }).click();
  const reqPromise = showPage.waitForRequest("/media");
  await showPage.getByRole("button", { name: "Archive" }).click();
  await reqPromise;

  await showPage.goto("/");
  await showPage.getByRole("button", { name: "View/Edit" }).click();
  await showPage.getByRole("button", { name: "Media archived" }).click();
  await showPage.getByRole("button", { name: "Reprocess" }).click();

  await expect(
    showPage.getByRole("button", { name: "Good to go!" }),
  ).toBeVisible({
    timeout: 30_000,
  });
});

test("media deletion", async ({ showPage }) => {
  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  const itemId = parseInt(
    (await showPage
      .getByTestId("ContinuityItemRow")
      .getAttribute("data-item-id"))!,
  );
  await createMedia(
    "smpte_bars_15s.mp4",
    readFileSync(__dirname + "/testdata/smpte_bars_15s.mp4"),
    "continuityItem",
    itemId,
  );

  await showPage.goto("/media");

  await showPage.getByLabel("Select", { exact: true }).click();
  await showPage.getByRole("button", { name: "Delet Selected" }).click();
  const reqPromise = showPage.waitForRequest("/media");
  await showPage.getByRole("button", { name: "Delet" }).click();
  await reqPromise;

  await showPage.goto("/");
  await showPage.getByRole("button", { name: "View/Edit" }).click();
  await expect(
    showPage.getByRole("button", { name: "Media missing" }),
  ).toBeVisible();
});
