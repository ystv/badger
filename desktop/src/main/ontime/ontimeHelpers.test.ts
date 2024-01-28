import { describe, expect, it } from "vitest";
import { showToOntimeEvents } from "./ontimeHelpers";

describe("ontimeHelpers", () => {
  describe("showToOntimeEvents", () => {
    it("works", () => {
      const res = showToOntimeEvents({
        id: 1,
        name: "Test",
        start: new Date("2023-10-06T19:00:00+01:00"),
        version: 0,
        ytBroadcastID: null,
        ytStreamID: null,
        rundowns: [
          {
            id: 1,
            name: "Test Rundown",
            showId: 1,
            order: 1,
            assets: [],
            ytBroadcastID: null,
            items: [
              {
                id: 1,
                name: "Test Item",
                durationSeconds: 300,
                media: null,
                notes: "",
                order: 1,
                rundownId: 1,
                mediaId: null,
                type: "Segment",
              },
            ],
          },
        ],
        continuityItems: [],
      });
      // Can't use a snapshot here because it's TZ-dependant
      expect(res).toHaveLength(3);
    });
  });
});
