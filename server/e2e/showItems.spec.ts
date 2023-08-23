import { test as base, expect, Page } from "@playwright/test";
import { readFileSync } from "fs";

const test = base.extend<{ showPage: Page }>({
  showPage: async ({ page, request }, use) => {
    await request.post("/api/resetDBInTestsDoNotUseOrYouWillBeFired");

    await page.goto("/shows/create");
    await page.getByLabel("Name").fill("Test Show");
    await page.getByLabel("Start").click();
    await page.getByText("27").click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.getByRole("heading", { name: "Test Show" }),
    ).toBeVisible();

    await use(page);
    await request.post("/api/resetDBInTestsDoNotUseOrYouWillBeFired");
  },
});

test("add, reorder, remove items", async ({ showPage }) => {
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:00");

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
    .toHaveText("Total runtime: 00:00");

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
  await showPage.getByLabel("Duration (seconds)").fill("60");
  const r1 = showPage.waitForRequest((r) => r.method() === "POST");
  await showPage.getByRole("button", { name: "Create" }).click();
  await r1;

  await showPage.getByLabel("Name").fill("Segment 2");
  await showPage.getByLabel("Duration (seconds)").fill("60");
  const r2 = showPage.waitForRequest((r) => r.method() === "POST");
  await showPage.getByRole("button", { name: "Create" }).click();
  await r2;

  await showPage.getByLabel("Name").press("Escape");

  await showPage.getByRole("link", { name: "Back" }).click();
  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 02:00");
  await expect
    .soft(showPage.getByRole("row").nth(1).getByTestId("RundownRow.time"))
    .toHaveText("00:00");
  await expect
    .soft(showPage.getByRole("row").nth(1).getByTestId("RundownRow.duration"))
    .toHaveText("02:00");
  await expect
    .soft(showPage.getByRole("row").nth(2).getByTestId("RundownRow.time"))
    .toHaveText("00:02");
});

test("add media", async ({ showPage }) => {
  const testFile = readFileSync(__dirname + "/testdata/smpte_bars_15s.mp4");

  await showPage.getByRole("button", { name: "New Continuity Item" }).click();
  await showPage.getByTestId("name-continuity_item").fill("Test");
  await showPage.getByTestId("create-continuity_item").click();
  await showPage.locator("body").press("Escape");

  await showPage.getByRole("button", { name: "Media Missing" }).click();

  // Playwright doesn't natively support dropping files, so we need to dispatch
  // the DataTransfer event ourselves. In order to do that, we need to get the file
  // from Node-world into JS-world, which we do by base64 encoding it and converting
  // it to an ArrayBuffer in the browser.
  const dataTransfer = await showPage.evaluateHandle((dataB64) => {
    const dt = new DataTransfer();
    const dataStr = atob(dataB64);
    const buf = new ArrayBuffer(dataStr.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < dataStr.length; i++) {
      bufView[i] = dataStr.charCodeAt(i);
    }
    const file = new File([buf], "smpte_bars_15s.mp4", {
      type: "video/mp4",
    });
    dt.items.add(file);
    return dt;
  }, testFile.toString("base64"));
  await showPage
    .getByText("Drop video files here, or click to select")
    .dispatchEvent("drop", { dataTransfer });

  await expect(
    showPage.getByRole("button", { name: "Good to go!" }),
  ).toBeVisible({
    timeout: 30_000,
  });

  await expect
    .soft(showPage.getByTestId("ShowItemsList.runtime"))
    .toHaveText("Total runtime: 00:15");
  await expect
    .soft(showPage.getByTestId("ContinuityItemRow.duration"))
    .toHaveText("00:15");
});
