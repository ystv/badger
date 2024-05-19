/* eslint-disable no-console */

import { Router, initTRPC } from "@trpc/server";
import { type AppRouter } from "badger-server/app/api/_router";
import SuperJSON from "superjson";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { Show, ShowSchema } from "@badger/prisma/types";
import { add } from "date-fns";
import { z } from "zod";
import {
  CompleteMediaModel,
  CompleteRundownModel,
  CompleteShowModel,
  ExtendedMediaModelWithDownloadURL,
} from "@badger/prisma/utilityTypes";
import * as path from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("../package.json");

const t = initTRPC.create({
  transformer: SuperJSON,
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8594;

const sampleRundown: z.infer<typeof CompleteRundownModel> = {
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

const sampleShow: z.infer<typeof CompleteShowModel> = {
  id: 1,
  name: "Test Show",
  start: add(new Date(), { days: 5 }),
  version: 1,
  ytBroadcastID: null,
  ytStreamID: null,
  continuityItems: [
    {
      id: 1,
      name: "Test Continuity Item",
      durationSeconds: 15,
      order: 1,
      media: null,
      mediaId: null,
      showId: 1,
      ytBroadcastID: null,
    },
  ],
  rundowns: [sampleRundown],
};

const testMedia: z.infer<typeof ExtendedMediaModelWithDownloadURL> = {
  id: 1,
  name: "smpte_bars_15s.mp4",
  path: "",
  rawPath: "",
  downloadURL: `http://localhost:${port}/testMedia/smpte_bars_15s.mp4`,
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

const router = t.router;
const proc = t.procedure;

const miniRouter = t.router({
  ping: proc.query(async () => {
    return {
      ping: "pong",
      version: packageJSON.version,
    };
  }) satisfies AppRouter["ping"],
  shows: router({
    listUpcoming: proc
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
    get: proc
      .input(z.object({ id: z.number() }))
      .output(CompleteShowModel)
      .query(async ({ input }) => {
        if (input.id !== sampleShow.id) {
          throw new Error("Not found");
        }
        return sampleShow;
      }),
    getVersion: proc
      .input(z.object({ id: z.number() }))
      .output(z.object({ version: z.number() }))
      .query(async ({ input }) => {
        if (input.id !== sampleShow.id) {
          throw new Error("Not found");
        }
        return { version: sampleShow.version };
      }),
  }) satisfies Pick<AppRouter["shows"], "listUpcoming" | "get" | "getVersion">,
  media: router({
    get: proc
      .input(z.object({ id: z.number() }))
      .output(ExtendedMediaModelWithDownloadURL)
      .query(async ({ input }) => {
        if (input.id !== testMedia.id) {
          throw new Error("Not found");
        }
        return testMedia;
      }),
    bulkGet: proc
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
  }) satisfies Pick<AppRouter["media"], "get" | "bulkGet">,
  rundowns: router({
    get: proc
      .input(z.object({ id: z.number() }))
      .output(CompleteRundownModel)
      .query(async ({ input }) => {
        if (input.id !== sampleRundown.id) {
          throw new Error("Not found");
        }
        return sampleRundown;
      }),
  }) satisfies Pick<AppRouter["rundowns"], "get">,
});

const app = express();

app.use(
  "/api/trpc",
  (req, res, next) => {
    const bearerToken = req.header("authorization")?.split(" ")[1];
    if (bearerToken === "microserver") {
      return next();
    }
    res.status(401).send("Unauthorized");
  },
  trpcExpress.createExpressMiddleware({
    router: miniRouter,
    createContext: () => ({}),
  }),
);

app.use("/testMedia", express.static(path.join(__dirname, "testMedia")));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`This is the Badger Desktop MicroServer.
Use it for testing or developing Badger Desktop.

Configure your Badger Desktop with the following details:
- Server address: http://localhost:${port}
- Server password: microserver

There is nothing more to see here.`);
});

app.listen(port, () => {
  console.log("MicroServer running.");
  console.log("Configure your Badger Desktop with the following details:");
  console.log("\tServer address: http://localhost:" + port);
  console.log("\tServer password: microserver");
  console.log();
});
