import { db } from "@/lib/db";
import { reorderShowItems } from "./actions";
import { integrate } from "@bowser/testing";
import { Show } from "@bowser/prisma/client";

jest.mock("server-only", () => ({}));
jest.mock("next/cache", () => ({ revalidatePath: () => {} }));

const TEST_TIME = new Date("2023-07-21T16:46:35.036Z");

integrate("reorderShowItems", () => {
  let testShow: Show;
  beforeEach(async () => {
    await db.$executeRawUnsafe("DELETE FROM shows");
    testShow = await db.show.create({
      data: {
        name: "Test Show",
        start: TEST_TIME,
        rundowns: {
          createMany: {
            data: [
              {
                name: "Test 1",
                order: 0,
              },
              {
                name: "Test 3",
                order: 2,
              },
            ],
          },
        },
        continuityItems: {
          createMany: {
            data: [
              {
                name: "Test 2",
                durationSeconds: 0,
                order: 1,
              },
              {
                name: "Test 4",
                durationSeconds: 0,
                order: 3,
              },
            ],
          },
        },
      },
    });
  });

  test("move 2 to 1", async () => {
    await reorderShowItems(1, "continuity_item", 1, 0);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems).toMatchInlineSnapshot(`
      [
        {
          "durationSeconds": 0,
          "id": 1,
          "mediaId": null,
          "name": "Test 2",
          "order": 0,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 1,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "id": 2,
          "name": "Test 3",
          "order": 2,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "mediaId": null,
          "name": "Test 4",
          "order": 3,
          "showId": 1,
          "ytBroadcastID": null,
        },
      ]
    `);
  });

  test("move 3 to 1", async () => {
    await reorderShowItems(1, "rundown", 2, 0);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems).toMatchInlineSnapshot(`
      [
        {
          "id": 2,
          "name": "Test 3",
          "order": 0,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 1,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "durationSeconds": 0,
          "id": 1,
          "mediaId": null,
          "name": "Test 2",
          "order": 2,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "mediaId": null,
          "name": "Test 4",
          "order": 3,
          "showId": 1,
          "ytBroadcastID": null,
        },
      ]
    `);
  });

  test("move 1 to 4", async () => {
    await reorderShowItems(1, "rundown", 1, 3);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems).toMatchInlineSnapshot(`
      [
        {
          "durationSeconds": 0,
          "id": 1,
          "mediaId": null,
          "name": "Test 2",
          "order": 0,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "id": 2,
          "name": "Test 3",
          "order": 1,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "mediaId": null,
          "name": "Test 4",
          "order": 2,
          "showId": 1,
          "ytBroadcastID": null,
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 3,
          "showId": 1,
          "ytBroadcastID": null,
        },
      ]
    `);
  });
});
