import { createAPIClient, serverApiClient } from "./serverApiClient";
import { z } from "zod";
import { initTRPC } from "@trpc/server";
import invariant from "../common/invariant";
import { selectedShow, setSelectedShow } from "./selectedShow";
import {
  CompleteShowModel,
  PartialShowModel,
} from "bowser-server/lib/db/utilityTypes";
import { Integration } from "../common/types";
import { createOBSConnection, obsConnection } from "./obs";
import {
  downloadMedia,
  DownloadStatusSchema,
  getDownloadStatus,
} from "./mediaManagement";
import { getLocalMediaSettings, LocalMediaSettingsSchema } from "./settings";
import { addOrReplaceMediaAsScene, findContinuityScenes } from "./obsHelpers";

function serverAPI() {
  invariant(serverApiClient !== null, "serverApiClient is null");
  return serverApiClient;
}

const t = initTRPC.create();
const r = t.router;
const proc = t.procedure;
export const appRouter = r({
  serverConnectionStatus: proc.query(async () => {
    return (
      serverApiClient !== null &&
      (await serverApiClient.ping.query()) === "pong"
    );
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
  listUpcomingShows: proc.output(z.array(PartialShowModel)).query(async () => {
    return await serverAPI().shows.listUpcoming.query();
  }),
  getSelectedShow: proc.output(CompleteShowModel.nullable()).query(() => {
    return selectedShow;
  }),
  setSelectedShow: proc
    .input(z.object({ id: z.number() }))
    .output(CompleteShowModel)
    .mutation(async ({ input }) => {
      const data = await serverAPI().shows.get.query({ id: input.id });
      await setSelectedShow(data);
      return data;
    }),
  supportedIntegrations: proc.output(z.array(Integration)).query(() => {
    // TODO: this is a fairly rudimentary check
    if (process.platform === "win32") {
      return ["vmix", "obs"];
    }
    return ["obs"];
  }),
  media: r({
    getDownloadStatus: proc
      .output(z.array(DownloadStatusSchema))
      .query(() => getDownloadStatus()),
    downloadMedia: proc
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        downloadMedia(input.id);
      }),
    getLocalMedia: proc
      .output(LocalMediaSettingsSchema)
      .query(async () => await getLocalMediaSettings()),
  }),
  obs: r({
    getConnectionState: proc
      .output(
        z.object({
          connected: z.boolean(),
          version: z.string().optional(),
          error: z.string().optional(),
        }),
      )
      .query(async () => {
        if (obsConnection === null) {
          return { connected: false };
        }
        try {
          const version = await obsConnection.ping();
          return { connected: true, version: version.obsVersion };
        } catch (e) {
          console.warn("OBS connection error", e);
          return { connected: false, error: String(e) };
        }
      }),
    connect: proc
      .input(
        z.object({
          host: z.string(),
          port: z.number(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        await createOBSConnection(input.host, input.password, input.port);
      }),
    addMediaAsScene: proc
      .input(
        z.object({
          id: z.number(),
          replaceMode: z.enum(["none", "replace", "force"]).default("none"),
        }),
      )
      .output(
        z.object({
          done: z.boolean(),
          warnings: z.array(z.string()),
          promptReplace: z.enum(["replace", "force"]).optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const info = await serverAPI().media.get.query({ id: input.id });
        invariant(
          info.continuityItem,
          "No continuity item for media in obs.addMediaAsScene",
        );
        return await addOrReplaceMediaAsScene(info, input.replaceMode);
      }),
    listContinuityItemScenes: proc
      .output(
        z.array(
          z.object({
            sceneName: z.string(),
            continuityItemID: z.number(),
          }),
        ),
      )
      .query(async () => {
        return await findContinuityScenes();
      }),
  }),
});
export type AppRouter = typeof appRouter;
