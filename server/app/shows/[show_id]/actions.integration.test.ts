import { db } from "@/lib/db";
import { describe, test, vi, beforeEach, afterEach, expect } from "vitest";
import { reorderShowItems } from "./actions";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

const TEST_TIME = new Date("2023-07-21T16:46:35.036Z");

describe("reorderShowItems", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe("TRUNCATE TABLE shows CASCADE");
    await db.show.create({
      data: {
        id: 1,
        name: "Test Show",
        start: TEST_TIME,
        rundowns: {
          createMany: {
            data: [
              {
                id: 1,
                name: "Test 1",
                order: 0,
              },
              {
                id: 2,
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
                id: 1,
                name: "Test 2",
                durationSeconds: 0,
                order: 1,
              },
              {
                id: 2,
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
      where: { id: 1 },
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
          "name": "Test 2",
          "order": 0,
          "showId": 1,
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 1,
          "showId": 1,
        },
        {
          "id": 2,
          "name": "Test 3",
          "order": 2,
          "showId": 1,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "name": "Test 4",
          "order": 3,
          "showId": 1,
        },
      ]
    `);
  });

  test("move 3 to 1", async () => {
    await reorderShowItems(1, "rundown", 2, 0);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: 1 },
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
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 1,
          "showId": 1,
        },
        {
          "durationSeconds": 0,
          "id": 1,
          "name": "Test 2",
          "order": 2,
          "showId": 1,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "name": "Test 4",
          "order": 3,
          "showId": 1,
        },
      ]
    `);
  });

  test("move 1 to 4", async () => {
    await reorderShowItems(1, "rundown", 1, 3);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: 1 },
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
          "name": "Test 2",
          "order": 0,
          "showId": 1,
        },
        {
          "id": 2,
          "name": "Test 3",
          "order": 1,
          "showId": 1,
        },
        {
          "durationSeconds": 0,
          "id": 2,
          "name": "Test 4",
          "order": 2,
          "showId": 1,
        },
        {
          "id": 1,
          "name": "Test 1",
          "order": 3,
          "showId": 1,
        },
      ]
    `);
  });
});
