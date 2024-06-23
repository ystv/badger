import {
  CompleteMediaModel,
  CompleteRundownModel,
  CompleteShowModel,
  ExtendedMediaModelWithDownloadURL,
} from "@badger/prisma/utilityTypes";
import { MICRO_SERVER_PORT, proc } from "../../lib";
import { add } from "date-fns";
import { z } from "zod";
import { ShowSchema } from "@badger/prisma/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("../../../package.json");

export const sampleRundown: z.infer<typeof CompleteRundownModel> = {
  id: 1,
  showId: 1,
  name: "Test Rundown",
  order: 1,
  ytBroadcastID: null,
  items: [
    {
      id: 1,
      rundownId: 1,
      order: 1,
      name: "Test VT",
      type: "VT",
      durationSeconds: 15,
      media: null,
      mediaId: null,
      notes: "",
    },
  ],
  assets: [],
};

export const sampleShow: z.infer<typeof CompleteShowModel> = {
  id: 1,
  name: "Test Show",
  start: add(new Date(), { days: 5 }),
  version: 1,
  ytBroadcastID: null,
  ytStreamID: null,
  continuityItems: [
    {
      id: 1,
      name: "Test Continuity",
      durationSeconds: 15,
      order: 0,
      media: null,
      mediaId: null,
      showId: 1,
      ytBroadcastID: null,
    },
  ],
  rundowns: [sampleRundown],
};

export const testMedia: z.infer<typeof ExtendedMediaModelWithDownloadURL> = {
  id: 1,
  name: "smpte_bars_15s.mp4",
  path: "",
  rawPath: "",
  downloadURL: `http://localhost:${MICRO_SERVER_PORT}/testMedia/smpte_bars_15s.mp4`,
  assets: [],
  continuityItems: [sampleShow.continuityItems[0]],
  durationSeconds: 15,
  rundownItems: [sampleRundown.items[0]],
  state: "Ready",
  tasks: [],
};
sampleRundown.items[0].media = testMedia;
sampleRundown.items[0].mediaId = testMedia.id;
sampleShow.continuityItems[0].media = testMedia;
sampleShow.continuityItems[0].mediaId = testMedia.id;

const responses = {
  ping: proc.query(async () => {
    return {
      ping: "pong",
      version: packageJSON.version,
    };
  }),
  "shows.listUpcoming": proc
    .input(
      z
        .object({
          gracePeriodHours: z.number().default(0),
        })
        .optional(),
    )
    .output(z.array(ShowSchema))
    .query(async () => {
      return [sampleShow];
    }),
  "shows.get": proc
    .input(z.object({ id: z.number() }))
    .output(CompleteShowModel)
    .query(async ({ input }) => {
      if (input.id !== sampleShow.id) {
        throw new Error("Not found");
      }
      return sampleShow;
    }),
  "shows.getVersion": proc
    .input(z.object({ id: z.number() }))
    .output(z.object({ version: z.number() }))
    .query(async ({ input }) => {
      if (input.id !== sampleShow.id) {
        throw new Error("Not found");
      }
      return { version: sampleShow.version };
    }),
  "media.get": proc
    .input(z.object({ id: z.number() }))
    .output(ExtendedMediaModelWithDownloadURL)
    .query(async ({ input }) => {
      if (input.id !== testMedia.id) {
        throw new Error("Not found");
      }
      return testMedia;
    }),
  "media.bulkGet": proc
    .input(z.array(z.number()))
    .output(z.array(CompleteMediaModel))
    .query(async ({ input }) => {
      if (!input.includes(testMedia.id)) {
        throw new Error("Not found");
      }
      return [
        {
          id: testMedia.id,
          name: testMedia.name,
          path: testMedia.path,
          rawPath: testMedia.rawPath,
          durationSeconds: testMedia.durationSeconds,
          state: "Ready",
          assets: [],
          continuityItems: [],
          tasks: testMedia.tasks,
          rundownItems: [
            {
              ...sampleRundown.items[0],
              rundown: {
                ...sampleRundown,
                show: sampleShow,
              },
            },
          ],
        } satisfies z.infer<typeof CompleteMediaModel>,
      ];
    }),
  "rundowns.get": proc
    .input(z.object({ id: z.number() }))
    .output(CompleteRundownModel)
    .query(async ({ input }) => {
      if (input.id !== sampleRundown.id) {
        throw new Error("Not found");
      }
      return sampleRundown;
    }),
};

export default responses;
