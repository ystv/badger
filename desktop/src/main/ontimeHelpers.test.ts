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
        rundowns: [
          {
            id: 1,
            name: "Test Rundown",
            showId: 1,
            order: 1,
            assets: [],
            items: [
              {
                id: 1,
                name: "Test Item",
                durationSeconds: 300,
                media: null,
                notes: "",
                order: 1,
                rundownId: 1,
                type: "Segment",
              },
            ],
          },
        ],
        continuityItems: [],
      });
      expect(res).toMatchInlineSnapshot(`
        [
          {
            "title": "Test Rundown",
            "type": "block",
          },
          {
            "colour": "",
            "duration": 300000,
            "timeEnd": 68700000,
            "timeStart": 68400000,
            "title": "Test Item",
            "type": "event",
          },
          {
            "title": "End Test Rundown",
            "type": "block",
          },
        ]
      `);
    });
  });
});
