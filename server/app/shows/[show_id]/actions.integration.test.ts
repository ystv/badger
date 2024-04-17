import { db } from "@/lib/db";
import { reorderShowItems } from "./actions";
import { integrate } from "@/lib/testing";
import { ContinuityItem, Rundown, Show } from "@badger/prisma/client";

jest.mock("server-only", () => ({}));
jest.mock("next/cache", () => ({ revalidatePath: () => {} }));

const TEST_TIME = new Date("2023-07-21T16:46:35.036Z");

integrate("reorderShowItems", () => {
  let testShow: Show & {
    rundowns: Rundown[];
    continuityItems: ContinuityItem[];
  };
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
      include: {
        rundowns: true,
        continuityItems: true,
      },
    });
  });

  test("move 2 to 1", async () => {
    await reorderShowItems(
      testShow.id,
      "continuity_item",
      testShow.continuityItems[0].id,
      0,
    );
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems.map((x) => x.id)).toEqual([
      testShow.continuityItems[0].id,
      testShow.rundowns[0].id,
      testShow.rundowns[1].id,
      testShow.continuityItems[1].id,
    ]);
  });

  test("move 3 to 1", async () => {
    await reorderShowItems(testShow.id, "rundown", testShow.rundowns[1].id, 0);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems.map((x) => x.id)).toEqual([
      testShow.rundowns[1].id,
      testShow.rundowns[0].id,
      testShow.continuityItems[0].id,
      testShow.continuityItems[1].id,
    ]);
  });

  test("move 1 to 4", async () => {
    await reorderShowItems(testShow.id, "rundown", testShow.rundowns[0].id, 3);
    const newShow = await db.show.findFirstOrThrow({
      where: { id: testShow.id },
      include: { rundowns: true, continuityItems: true },
    });
    const newItems = [...newShow.rundowns, ...newShow.continuityItems].sort(
      (a, b) => a.order - b.order,
    );
    expect(newItems.map((x) => x.id)).toEqual([
      testShow.continuityItems[0].id,
      testShow.rundowns[1].id,
      testShow.continuityItems[1].id,
      testShow.rundowns[0].id,
    ]);
  });
});
