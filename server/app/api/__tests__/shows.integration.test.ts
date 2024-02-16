import { integrate } from "@badger/testing";
import { appRouter } from "../_router";
import { db } from "@/lib/db";
import { add, sub } from "date-fns";

const api = appRouter.createCaller({});

integrate("shows", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe("DELETE FROM shows");
  });
  describe("listUpcoming", () => {
    it("returns nothing with no shows", async () => {
      await expect(api.shows.listUpcoming()).resolves.toEqual([]);
    });

    it("returns upcoming shows", async () => {
      await db.show.create({
        data: {
          name: "Test Show",
          start: add(new Date(), { hours: 1 }),
        },
      });
      const r = await api.shows.listUpcoming();
      expect(r).toHaveLength(1);
      expect(r[0]).toMatchSnapshot({
        id: expect.any(Number),
        name: "Test Show",
        start: expect.any(Date),
        version: 0,
      });
    });

    it("excludes shows that have already finished", async () => {
      await db.show.create({
        data: {
          name: "Test Show",
          start: sub(new Date(), { hours: 1 }),
        },
      });
      await expect(api.shows.listUpcoming()).resolves.toEqual([]);
    });

    it("returns shows that have started but not finished [BDGR-112]", async () => {
      await db.show.create({
        data: {
          name: "Test Show",
          start: sub(new Date(), { minutes: 15 }),
          continuityItems: {
            create: {
              name: "Test",
              order: 0,
              durationSeconds: 30 * 60,
            },
          },
        },
      });
      const r = await api.shows.listUpcoming();
      expect(r).toHaveLength(1);
    });
  });
});
