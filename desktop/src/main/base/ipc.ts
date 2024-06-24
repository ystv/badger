import { z } from "zod";
import { proc, r } from "./ipcRouter";
import logging, { setLogLevel, logLevel } from "./logging";
import { getItemLoadingSettings, itemLoadingSettingsSchema } from "./settings";
import { createAPIClient, serverAPI, serverApiClient } from "./serverApiClient";
import { supportedIntegrations } from "./integrations";
import { ShowSchema } from "@badger/prisma/types";
import { CompleteShowModel } from "@badger/prisma/utilityTypes";
import { Integration } from "../../common/types";
import { selectedShow, setSelectedShow } from "./selectedShow";
import { inspect } from "node:util";

const logger = logging.getLogger("ipcApi");
const rendererLogger = logging.getLogger("renderer");

export const coreRouter = r({
  getItemLoadSettings: proc
    .output(itemLoadingSettingsSchema)
    .query(async () => {
      return await getItemLoadingSettings();
    }),
  serverConnectionStatus: proc
    .output(
      z.object({
        ok: z.boolean(),
        warnings: z
          .object({
            versionSkew: z.boolean().optional(),
          })
          .optional(),
      }),
    )
    .query(async () => {
      if (serverApiClient === null) {
        return { ok: false };
      }
      const pingRes = await serverApiClient.ping.query();
      return {
        ok: pingRes.ping === "pong",
        warnings: {
          versionSkew: pingRes.version !== global.__APP_VERSION__,
        },
      };
    }),
  supportedIntegrations: proc.output(z.array(Integration)).query(() => {
    return supportedIntegrations;
  }),
  getLogLevel: proc
    .output(z.enum(["trace", "debug", "info", "warn", "error"]))
    .query(() => {
      return logLevel;
    }),
  setLogLevel: proc
    .input(z.enum(["trace", "debug", "info", "warn", "error"]))
    .mutation(async ({ input }) => {
      setLogLevel(input);
    }),
  log: proc
    .input(
      z.object({
        level: z.enum(["trace", "debug", "info", "warn", "error"]),
        logger: z.string().optional(),
        message: z.string(),
      }),
    )
    .mutation(({ input }) => {
      rendererLogger[input.level](input.message);
    }),
  connectToServer: proc
    .input(
      z.object({
        endpoint: z.string().url(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await createAPIClient(input.endpoint + "/api/trpc", input.password);
      return true;
    }),
});

export const showsRouter = r({
  listUpcomingShows: proc.output(z.array(ShowSchema)).query(async () => {
    return await serverAPI().shows.listUpcoming.query({
      gracePeriodHours: 24,
    });
  }),
  getSelectedShow: proc.output(CompleteShowModel.nullable()).query(() => {
    logger.trace(
      `getSelectedShow called, current value is ${inspect(selectedShow.value)}`,
    );
    return selectedShow.value;
  }),
  setSelectedShow: proc
    .input(z.object({ id: z.number() }))
    .output(CompleteShowModel)
    .mutation(async ({ input }) => {
      const data = await serverAPI().shows.get.query({ id: input.id });
      await setSelectedShow(data);
      return data;
    }),
});
