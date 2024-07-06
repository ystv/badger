import { produce } from "immer";
import { test, expect } from "../../testUtils";
import { createShow, fileToDataTransfer, getAPIClient } from "@/e2e/lib";
import { Show } from "@badger/prisma/types";
import { readFileSync } from "node:fs";
import { Page } from "@playwright/test";

test.describe.configure({ mode: "serial" });
test.use({ resetDBBetweenTests: false });

let page: Page;

test("ping", async ({ live, micro }) => {
  expect(await micro.ping.query()).toMatchObject(await live.ping.query());
});

test("shows.listUpcoming", async ({ live, micro }) => {
  expect(cleanShows(await micro.shows.listUpcoming.query())).toMatchObject(
    cleanShows(await live.shows.listUpcoming.query()),
  );
});

test("shows.get", async ({ live, micro }) => {
  expect(cleanShow(await micro.shows.get.query({ id: 1 }))).toMatchObject(
    cleanShow(await live.shows.get.query({ id: 1 })),
  );
});

// Helpers

function cleanShow(show: Show): Show {
  return produce(show, (draft) => {
    draft.start = new Date(0);
    draft.version = 1;
  });
}

function cleanShows(shows: Show[]): Show[] {
  return shows.map((s) => cleanShow(s));
}

// Setup

test.beforeAll(async ({ browser, request }) => {
  await request.post(
    "/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB",
  );
  page = await browser.newPage();

  await createShow(page, "Test Show");

  const testFile = readFileSync(
    __dirname + "/../../testMedia/smpte_bars_15s.mp4",
  );

  await page.goto(`/shows/1`);

  await page.getByRole("button", { name: "New Continuity Item" }).click();
  await page.getByTestId("name-continuity_item").fill("Test Continuity");
  await page.getByTestId("create-continuity_item").click();

  await page.getByRole("button", { name: "Media Missing" }).click();
  await page.getByText("Upload file").click();
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

  await page.getByRole("button", { name: "New Rundown" }).click();
  await page.getByTestId("name-rundown").fill("Test Rundown");
  await page.getByTestId("create-rundown").click();
  await page.getByRole("link", { name: "Edit", exact: true }).click();

  await page.getByRole("button", { name: "Add Segment" }).click();
  await page.getByLabel("Name").fill("Test VT");
  await page.getByLabel("Type").selectOption("VT");
  await page.getByLabel("Duration").fill("15");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(
    page.getByRole("button", { name: "Media missing" }),
  ).toBeVisible();

  // We want to reuse the media we uploaded earlier, but the
  // two have different container types (rundown/continuity items)
  // which the UI doesn't support.
  // Use the test-only API as a workaround.
  const api = getAPIClient();
  await api.shows.update.mutate({
    id: 1,
    data: {
      rundowns: {
        update: {
          where: {
            id: 1,
          },
          data: {
            items: {
              update: {
                where: { id: 1 },
                data: {
                  media: {
                    connect: {
                      id: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
});

test.afterAll(async () => {
  await page.close();
});
