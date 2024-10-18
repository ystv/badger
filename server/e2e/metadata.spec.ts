import {
  test,
  expect,
  getAPIClient,
  fileToDataTransfer,
  createShow,
} from "./lib";
import { readFileSync } from "node:fs";
import path from "node:path";

test.beforeEach(async () => {
  const api = getAPIClient();
  await api.metaFields.put.mutate([
    {
      name: "Test Text on Shows",
      target: "Show",
      type: "Text",
      default: true,
    },
    {
      name: "Test Non-Default",
      target: "Show",
      type: "Text",
      default: false,
    },
    {
      name: "Media",
      target: "Show",
      type: "Media",
      default: false,
    },
  ]);
});

test("Text fields", async ({ showPage: page }) => {
  await page.getByLabel("Test Text on Shows").fill("Test");
  const req = page.waitForRequest("/shows/**");
  await page.getByTestId("MetaValue.save").click();
  await req;
  await expect(
    page.getByLabel("Test Text on Shows").inputValue(),
  ).resolves.toBe("Test");
});

test("Non-default", async ({ showPage: page }) => {
  await page.getByRole("button", { name: "Add extra show details " }).click();
  await page.getByRole("menuitem", { name: "Test Non-Default" }).click();
  await page.getByLabel("Test Non-Default").fill("Test 2");
  const req = page.waitForRequest("/shows/**");
  await page.getByTestId("MetaValue.save").click();
  await req;
  await expect(page.getByLabel("Test Non-Default").inputValue()).resolves.toBe(
    "Test 2",
  );
});

test("Media metadata", async ({ showPage: page }) => {
  const testFile = readFileSync(
    path.join(__dirname, "testdata", "smpte_bars_15s.mp4"),
  );
  await page.getByRole("button", { name: "Add extra show details " }).click();
  await page.getByRole("menuitem", { name: "Media" }).click();
  await page
    .getByRole("button", { name: "Media Missing ", exact: true })
    .click();
  await page.getByText("Upload file").click();
  await expect(
    page.getByText("Drop files here, or click to select"),
  ).toBeInViewport();
  await page
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        page,
        testFile,
        "smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });
  await expect(page.getByRole("button", { name: "Good to go!" })).toBeVisible({
    timeout: 30_000,
  });

  // Check it stays there and gets properly saved
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Good to go!" })).toBeVisible();
});

test("Media metadata reuse", async ({ showPage: page }) => {
  test.slow();
  const testFile = readFileSync(
    path.join(__dirname, "testdata", "smpte_bars_15s.mp4"),
  );

  // Upload the media to a show in the past
  await createShow(page, "Test 2", "past");
  await page.getByRole("button", { name: "Add extra show details " }).click();
  await page.getByRole("menuitem", { name: "Media" }).click();
  await page
    .getByRole("button", { name: "Media Missing ", exact: true })
    .click();
  await page.getByText("Upload file").click();
  await expect(
    page.getByText("Drop files here, or click to select"),
  ).toBeInViewport();
  await page
    .getByText("Drop files here, or click to select")
    .dispatchEvent("drop", {
      dataTransfer: await fileToDataTransfer(
        page,
        testFile,
        "smpte_bars_15s.mp4",
        "video/mp4",
      ),
    });
  await expect(page.getByRole("button", { name: "Good to go!" })).toBeVisible({
    timeout: 30_000,
  });

  // Now go back to the initial test show
  await page.goto("/");
  await page.getByText("View/Edit").click();
  await page.getByRole("button", { name: "Add extra show details " }).click();
  await page.getByRole("menuitem", { name: "Media" }).click();
  await page
    .getByRole("button", { name: "Media Missing ", exact: true })
    .click();
  await page.getByText("Use media from previous show").click();

  await page.getByText("Select show").click();
  await page.getByRole("option").first().click();
  await page.getByRole("button", { name: "Use" }).click();
  await expect(page.getByRole("button", { name: "Good to go!" })).toBeVisible();
});
