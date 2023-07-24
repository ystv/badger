import { serverApiClient, createAPIClient } from "./serverApiClient";
import { z } from "zod";
import { initTRPC } from "@trpc/server";
import invariant from "../common/invariant";
import { selectedShow, setSelectedShow } from "./selectedShow";
import {
  CompleteShowModel,
  PartialShowModel,
} from "bowser-server/lib/db/types/_utility";
import { Integration } from "../common/types";
import { createOBSConnection, obsConnection } from "./obs";
import {
  downloadMedia,
  DownloadStatusSchema,
  getDownloadStatus,
} from "./mediaManagement";
import { getLocalMediaSettings, LocalMediaSettingsSchema } from "./settings";

function api() {
  invariant(serverApiClient !== null, "serverApiClient is null");
  return serverApiClient;
}

const CONTINUITY_SCENE_RE = /\d+ - .+? \[#(\d+)]/;

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
    const res = await api().shows.listUpcoming.query();

    return res;
  }),
  getSelectedShow: proc.output(CompleteShowModel.nullable()).query(() => {
    return selectedShow;
  }),
  setSelectedShow: proc
    .input(z.object({ id: z.number() }))
    .output(CompleteShowModel)
    .mutation(async ({ input }) => {
      const data = await api().shows.get.query({ id: input.id });
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
    listContinuityItemScenes: proc
      .output(z.array(z.number()))
      .query(async () => {
        invariant(
          obsConnection,
          "no OBS connection in obs.listContinuityItemScenes",
        );
        const scenes = await obsConnection.listScenes();
        return scenes
          .filter((x) => CONTINUITY_SCENE_RE.test(x.sceneName as string))
          .map((x) => {
            const match = (x.sceneName as string).match(CONTINUITY_SCENE_RE);
            invariant(match, "Scene name doesn't match regex");
            return Number(match[1]);
          });
      }),
    addMediaAsScene: proc
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const localMedia = await getLocalMediaSettings();
        const item = localMedia.find((x) => x.mediaID === input.id);
        invariant(item !== undefined, "No local media for obs.addMediaAsScene");
        const info = await api().media.get.query({ id: input.id });
        invariant(
          info.continuityItem,
          "No continuity item for media in obs.addMediaAsScene",
        );
        const mediaSourceName = `Bowser Media ${info.id}`;
        const sceneTitle = `${info.continuityItem.order} - ${info.continuityItem.name} [#${info.continuityItemID}]`;
        invariant(obsConnection, "no OBS connection");
        const scenes = await obsConnection.listScenes();
        const ours = scenes.find((x) => x.sceneName === sceneTitle);
        console.log("Found scene", ours);
        if (ours) {
          const items = await obsConnection.getSceneItems(sceneTitle);
          const existing = items.find((x) => x.sourceName === mediaSourceName);
          if (existing) {
            // TODO: Handle media file replacements
            console.log("Already present");
            return;
          }
          await obsConnection.addMediaSourceToScene(
            sceneTitle,
            mediaSourceName,
            item.path,
          );
        } else {
          await obsConnection.createScene(sceneTitle);
          await obsConnection.addMediaSourceToScene(
            sceneTitle,
            mediaSourceName,
            item.path,
          );
        }
      }),
  }),
});
export type AppRouter = typeof appRouter;
