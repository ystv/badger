import { produce } from "immer";
import { test, expect, MICRO_SERVER_PORT } from "../../testUtils";
import { createShow, fileToDataTransfer, getAPIClient } from "@/e2e/lib";
import { Show } from "@badger/prisma/types";
import { readFileSync } from "node:fs";
import { Page } from "@playwright/test";
import {
  CompleteMediaModel,
  ExtendedMediaModelWithDownloadURL,
} from "@badger/prisma/utilityTypes";
import { z } from "zod";
import { omit } from "lodash";

test("microserver/scenarios/default", async ({ page, micro, live }) => {
  await createShow(page, "Test Show");
  await setupTestShow(page);

  // These are all soft assertions in one test, rather than separate tests.
  // This is because we want to set up the test show once, then test all the
  // assertions. Playwright isn't built for that, and assumes each test
  // is isolated, so we do it all in one test.

  // Version is determined at build time
  const dropVersion = (o: object) => omit(o, "version");
  expect
    .soft(dropVersion(await micro.ping.query()))
    .toMatchObject(dropVersion(await live.ping.query()));

  expect
    .soft(cleanShows(await micro.shows.listUpcoming.query()))
    .toMatchObject(cleanShows(await live.shows.listUpcoming.query()));

  expect
    .soft(cleanShow(await micro.shows.get.query({ id: 1 })))
    .toMatchObject(cleanShow(await live.shows.get.query({ id: 1 })));

  expect
    .soft(await micro.shows.getVersion.query({ id: 1 }))
    .toMatchObject(await live.shows.getVersion.query({ id: 1 }));

  expect
    .soft(cleanMedia(await micro.media.get.query({ id: 1 })))
    .toMatchObject(cleanMedia(await live.media.get.query({ id: 1 })));

  expect
    .soft((await micro.media.bulkGet.query([1])).map((m) => cleanMedia(m)))
    .toMatchObject(
      (await live.media.bulkGet.query([1])).map((m) => cleanMedia(m)),
    );

  expect
    .soft(await micro.rundowns.get.query({ id: 1 }))
    .toMatchObject(await live.rundowns.get.query({ id: 1 }));
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

function cleanMedia(
  media:
    | z.infer<typeof ExtendedMediaModelWithDownloadURL>
    | z.infer<typeof CompleteMediaModel>,
) {
  return produce(media, (draft) => {
    for (const task of draft.tasks) {
      task.id = -1; // order is unpredictable
    }
    draft.tasks = draft.tasks.sort((a, b) =>
      a.description.localeCompare(b.description),
    );
    if ("downloadURL" in draft) {
      draft.downloadURL = `http://localhost:${MICRO_SERVER_PORT}/testMedia/smpte_bars_15s.mp4`;
    }
    for (const ci of draft.continuityItems) {
      if ("show" in ci) {
        ci.show = cleanShow(ci.show);
      }
    }
    for (const ri of draft.rundownItems) {
      if ("rundown" in ri) {
        ri.rundown.show = cleanShow(ri.rundown.show);
      }
    }
  });
}

// Setup
async function setupTestShow(page: Page) {
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
  await page.getByRole("link", { name: "Edit Rundown", exact: true }).click();

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
}
