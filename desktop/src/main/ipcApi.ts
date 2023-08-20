import { createAPIClient, serverApiClient } from "./serverApiClient";
import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import invariant from "../common/invariant";
import { selectedShow, setSelectedShow } from "./selectedShow";
import {
  CompleteShowModel,
  PartialMediaModel,
  PartialShowModel,
} from "@bowser/prisma/utilityTypes";
import { Integration } from "../common/types";
import { createOBSConnection, obsConnection } from "./obs";
import {
  downloadMedia,
  DownloadStatusSchema,
  getDownloadStatus,
} from "./mediaManagement";
import {
  assetsSettingsSchema,
  devToolsConfigSchema,
  getAssetsSettings,
  getDevToolsConfig,
  getLocalMediaSettings,
  LocalMediaSettingsSchema,
  saveDevToolsConfig,
} from "./settings";
import { addOrReplaceMediaAsScene, findContinuityScenes } from "./obsHelpers";
import { createVMixConnection, getVMixConnection } from "./vmix";
import { getInputTypeForAsset, reconcileList } from "./vmixHelpers";
import { VMIX_NAMES } from "../common/constants";
import { ListInput } from "./vmixTypes";
import { IPCEvents } from "./ipcEventBus";

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
  supportedIntegrations: proc.output(z.array(Integration)).query(() => {
    // TODO: this is a fairly rudimentary check
    if (process.platform === "win32") {
      return ["vmix", "obs"];
    }
    return ["obs"];
  }),
  devtools: r({
    getSettings: proc
      .output(devToolsConfigSchema)
      .query(() => getDevToolsConfig()),
    setSettings: proc
      .input(devToolsConfigSchema)
      .mutation(async ({ input }) => {
        await saveDevToolsConfig(input);
        IPCEvents.devToolsSettingsChange();
      }),
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
    downloadAllMediaForSelectedShow: proc.mutation(async () => {
      const show = selectedShow.value;
      invariant(show, "No show selected");
      const state = await getLocalMediaSettings();
      for (const rundown of show.rundowns) {
        for (const item of rundown.items) {
          if (
            item.media?.state === "Ready" &&
            !state.some((x) => x.mediaID === item.media?.id)
          ) {
            downloadMedia(item.media.id);
          }
        }
      }
      for (const item of show.continuityItems) {
        if (
          item.media?.state === "Ready" &&
          !state.some((x) => x.mediaID === item.media?.id)
        ) {
          downloadMedia(item.media.id);
        }
      }
    }),
  }),
  obs: r({
    getConnectionState: proc
      .output(
        z.object({
          connected: z.boolean(),
          version: z.string().optional(),
          error: z.string().optional(),
          availableRequests: z.array(z.string()).optional(),
        }),
      )
      .query(async () => {
        if (obsConnection === null) {
          return { connected: false };
        }
        try {
          const version = await obsConnection.ping();
          return {
            connected: true,
            version: version.obsVersion,
            availableRequests: version.availableRequests,
          };
        } catch (e) {
          console.warn("OBS connection error", e);
          return { connected: false, error: String(e) };
        }
      }),
    connect: proc
      .input(
        z.object({
          host: z.string(),
          port: z.coerce.number(),
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
            sources: z.array(
              z.object({
                mediaID: z.number().optional(),
              }),
            ),
          }),
        ),
      )
      .query(async () => {
        return await findContinuityScenes();
      }),
    dev: r({
      callArbitrary: proc
        .input(z.object({ req: z.string(), params: z.any() }))
        .output(z.any())
        .mutation(async ({ input }) => {
          const dtSettings = await getDevToolsConfig();
          if (!dtSettings.enabled) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: "Dev tools not enabled",
            });
          }
          invariant(obsConnection, "no OBS connection");
          return await obsConnection.callArbitraryDoNotUseOrYouWillBeFired(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            input.req as any,
            input.params,
          );
        }),
    }),
  }),
  vmix: r({
    getConnectionState: proc
      .output(
        z.object({
          connected: z.boolean(),
          version: z.string().optional(),
          edition: z.string().optional(),
        }),
      )
      .query(async () => {
        const conn = getVMixConnection();
        if (conn === null) {
          return { connected: false };
        }
        const state = await conn.getFullState();
        return {
          connected: true,
          version: state.version,
          edition: state.edition,
        };
      }),
    tryConnect: proc
      .input(
        z.object({
          host: z.string(),
          port: z.number(),
        }),
      )
      .output(
        z.object({
          connected: z.boolean(),
          version: z.string().optional(),
          edition: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const conn = await createVMixConnection(input.host, input.port);
        const state = await conn.getFullState();
        return {
          connected: true,
          version: state.version,
          edition: state.edition,
        };
      }),
    getCompleteState: proc.query(() => {
      const conn = getVMixConnection();
      invariant(conn, "No vMix connection");
      return conn.getFullState();
    }),
    loadRundownVTs: proc
      .input(
        z.object({
          rundownID: z.number(),
        }),
      )
      .mutation(async ({ input }) => {
        const rundown = await serverAPI().rundowns.get.query({
          id: input.rundownID,
        });
        invariant(rundown, "Rundown not found");
        const media = rundown.items
          .map<z.infer<typeof PartialMediaModel> | null>((i) => i.media)
          .filter((x) => x && x.state === "Ready");
        const localMedia = await getLocalMediaSettings();
        const paths = media.map(
          (remote) =>
            localMedia.find((local) => local.mediaID === remote?.id)?.path,
        );
        if (paths.some((x) => !x)) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Not all media is downloaded locally",
          });
        }
        await reconcileList(VMIX_NAMES.VTS_LIST, paths as string[]);
      }),
    loadAssets: proc
      .input(
        z.object({
          rundownID: z.number(),
          assetIDs: z.array(z.number()),
        }),
      )
      .mutation(async ({ input }) => {
        const rundown = await serverAPI().rundowns.get.query({
          id: input.rundownID,
        });
        invariant(rundown, "Rundown not found");
        const assets = rundown.assets.filter((x) =>
          input.assetIDs.includes(x.id),
        );
        if (assets.length !== input.assetIDs.length) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Not all assets are in the rundown",
          });
        }
        const localMedia = await getLocalMediaSettings();
        const settings = await getAssetsSettings();
        const vmix = getVMixConnection();
        invariant(vmix, "No vMix connection");
        const state = await vmix.getFullState();
        for (const asset of assets) {
          if (!asset.media || asset.media.state !== "Ready") {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: "Not all assets are ready",
            });
          }
          const local = localMedia.find((x) => x.mediaID === asset.media!.id);
          if (!local) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: "Not all assets are downloaded locally",
            });
          }

          // TODO: See if everything below here could be refactored out - not currently done to avoid needing to refetch
          //  vMix state each time
          const loadType = settings.loadTypes[asset.type];
          if (!loadType) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: "No load type for asset type",
            });
          }
          if (loadType === "direct") {
            const present = state.inputs.find(
              (x) => x.title === asset.media!.name,
            );
            if (!present) {
              await vmix.addInput(getInputTypeForAsset(asset), local.path);
            }
          } else if (loadType === "list") {
            let present;
            const list = state.inputs.find(
              (x) => x.shortTitle === VMIX_NAMES.ASSET_LIST[asset.type],
            );
            let listKey;
            if (!list) {
              present = false;
              listKey = await vmix.addInput("VideoList", "");
              await vmix.renameInput(
                listKey,
                VMIX_NAMES.ASSET_LIST[asset.type],
              );
            } else {
              listKey = list.key;
              present = (list as ListInput).items.some(
                (x) => x.source === local.path,
              );
            }
            if (!present) {
              await vmix.addInputToList(listKey, local.path);
            }
          } else {
            invariant(false, "Invalid load type " + loadType);
          }
        }
      }),
  }),
  assets: r({
    getSettings: proc
      .output(assetsSettingsSchema)
      .query(() => getAssetsSettings()),
  }),
});
export type AppRouter = typeof appRouter;
