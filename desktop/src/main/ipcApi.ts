import { createAPIClient, serverApiClient } from "./serverApiClient";
import { z } from "zod";
import * as fsp from "node:fs/promises";
import { callProcedure, initTRPC, TRPCError } from "@trpc/server";
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
  deleteMedia,
  downloadMedia,
  DownloadStatusSchema,
  getDownloadStatus,
  getMediaPath,
} from "./mediaManagement";
import {
  assetsSettingsSchema,
  devToolsConfigSchema,
  getAssetsSettings,
  getDevToolsConfig,
  getDownloadsSettings,
  getLocalMediaSettings,
  getOntimeSettings,
  LocalMediaData,
  LocalMediaSettingsSchema,
  ontimeSettingsSchema,
  saveDevToolsConfig,
  saveDownloadsSettings,
  saveOntimeSettings,
} from "./settings";
import {
  addOrReplaceMediaAsScene,
  findContinuityScenes,
  MediaType,
} from "./obsHelpers";
import { createVMixConnection, getVMixConnection } from "./vmix";
import { loadAssets, reconcileList } from "./vmixHelpers";
import { VMIX_NAMES } from "../common/constants";
import { IPCEvents } from "./ipcEventBus";
import {
  createOntimeConnection,
  getOntimeInstance,
  isOntimeConnected,
} from "./ontime";
import { showToOntimeEvents } from "./ontimeHelpers";
import { shell, ipcMain } from "electron";
import { getAvailableDownloaders } from "./downloadFile";

function serverAPI() {
  invariant(serverApiClient !== null, "serverApiClient is null");
  return serverApiClient;
}

const t = initTRPC.create();
const r = t.router;
const proc = t.procedure;

let supportedIntegrations: Integration[];
// This is fairly rudimentary
if (process.platform === "win32") {
  supportedIntegrations = ["vmix", "obs", "ontime"];
} else {
  supportedIntegrations = ["obs", "ontime"];
}

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
    return supportedIntegrations;
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
    throwException: proc.mutation(async () => {
      if (!(await getDevToolsConfig()).enabled) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Dev tools not enabled",
        });
      }
      process.nextTick(() => {
        throw new Error("Test Main Process Exception");
      });
    }),
    crash: proc.mutation(async () => {
      if (!(await getDevToolsConfig()).enabled) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Dev tools not enabled",
        });
      }
      process.crash();
    }),
    setEnabledIntegrations: proc
      .input(z.array(z.string()))
      .mutation(async ({ input }) => {
        if (!(await getDevToolsConfig()).enabled) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Dev tools not enabled",
          });
        }
        supportedIntegrations = input as Integration[];
      }),
  }),
  media: r({
    getDownloadStatus: proc
      .output(z.array(DownloadStatusSchema))
      .query(() => getDownloadStatus()),
    downloadMedia: proc
      .input(z.object({ id: z.number(), name: z.string().optional() }))
      .mutation(async ({ input }) => {
        downloadMedia(input.id, input.name);
      }),
    getLocalMedia: proc
      .input(
        z
          .object({
            includeSize: z.boolean().default(false),
          })
          .optional(),
      )
      .output(
        z.array(
          LocalMediaData.extend({
            sizeBytes: z.number().optional(),
          }),
        ),
      )
      .query(async ({ input }) => {
        const media = await getLocalMediaSettings();
        if (input?.includeSize) {
          await Promise.all(
            media.map(async (item) => {
              let stat;
              try {
                stat = await fsp.stat(item.path);
              } catch (e) {
                // This is an orphan. TODO [BOW-67]: we don't currently handle them
                return;
              }
              // prettier-ignore
              (item as z.infer<typeof LocalMediaData> & {sizeBytes: number}).sizeBytes = stat.size;
            }),
          );
        }
        return media;
      }),
    getPath: proc.output(z.string()).query(() => getMediaPath()),
    openPath: proc.mutation(async () => {
      await shell.openPath(await getMediaPath());
    }),
    delete: proc
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMedia(input.id);
      }),
    deleteOldMedia: proc
      .input(z.object({ minAgeDays: z.number() }))
      .mutation(async ({ input }) => {
        const localMedia = await getLocalMediaSettings();
        const currentShow = selectedShow.value;
        let notInUse;
        if (currentShow) {
          const inUse = new Set<number>();
          currentShow?.continuityItems.forEach((x) => {
            if (x.media) {
              inUse.add(x.media.id);
            }
          });
          currentShow?.rundowns.forEach((x) =>
            x.items.forEach((y) => {
              if (y.media) {
                inUse.add(y.media.id);
              }
            }),
          );
          notInUse = localMedia.filter((x) => !inUse.has(x.mediaID));
        } else {
          notInUse = localMedia;
        }
        const mediaObjects = await serverAPI().media.bulkGet.query(
          notInUse.map((x) => x.mediaID),
        );
        for (const result of mediaObjects) {
          console.log("Deletion candidate", result);
          if (result.state !== "Ready") {
            continue;
          }
          let showDate;
          if (result.continuityItem) {
            showDate = result.continuityItem.show.start;
          } else if (result.rundownItem) {
            showDate = result.rundownItem.rundown.show.start;
          } else if (result.asset) {
            showDate = result.asset.rundown.show.start;
          } else {
            invariant(
              false,
              "Media item without rundown, continuity item, or asset",
            );
          }
          const age = (Date.now() - showDate.getTime()) / (1000 * 60 * 60 * 24);
          console.log(
            result.id,
            result.name,
            "age",
            age,
            "threshold",
            input.minAgeDays,
          );
          if (age > input.minAgeDays) {
            console.log("Deleting", result.id);
            await deleteMedia(result.id);
          }
        }
      }),
    downloadAllMediaForSelectedShow: proc.mutation(async () => {
      const show = selectedShow.value;
      invariant(show, "No show selected");
      const state = await getLocalMediaSettings();
      if (getVMixConnection() !== null) {
        for (const rundown of show.rundowns) {
          for (const item of rundown.items) {
            if (
              item.media?.state === "Ready" &&
              !state.some((x) => x.mediaID === item.media?.id)
            ) {
              downloadMedia(item.media.id, item.media.name);
            }
          }
          for (const item of rundown.assets) {
            if (
              item.media?.state === "Ready" &&
              !state.some((x) => x.mediaID === item.media?.id)
            ) {
              downloadMedia(item.media.id, item.media.name);
            }
          }
        }
      }
      if (obsConnection !== null) {
        for (const item of show.continuityItems) {
          if (
            item.media?.state === "Ready" &&
            !state.some((x) => x.mediaID === item.media?.id)
          ) {
            downloadMedia(item.media.id, item.media.name);
          }
        }
      }
    }),
    getAvailableDownloaders: proc
      .output(z.array(z.enum(["Auto", "Node", "Curl"])))
      .query(async () => {
        return ["Auto", ...(await getAvailableDownloaders())];
      }),
    getSelectedDownloader: proc
      .output(z.enum(["Auto", "Node", "Curl"]))
      .query(async () => {
        const settings = await getDownloadsSettings();
        return settings.downloader;
      }),
    setSelectedDownloader: proc
      .input(z.enum(["Auto", "Node", "Curl"]))
      .mutation(async ({ input }) => {
        await saveDownloadsSettings({ downloader: input });
      }),
  }),
  obs: r({
    getConnectionState: proc
      .output(
        z.object({
          connected: z.boolean(),
          version: z.string().optional(),
          platform: z.string().optional(),
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
            platform: version.platformDescription,
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
        return await addOrReplaceMediaAsScene(
          info as MediaType,
          input.replaceMode,
        );
      }),
    addAllSelectedShowMedia: proc
      .output(
        z.object({
          done: z.number(),
          warnings: z.array(z.string()),
        }),
      )
      .mutation(async () => {
        const show = selectedShow.value;
        invariant(show, "No show selected");
        const state = await getLocalMediaSettings();
        let done = 0;
        const warnings: string[] = [];
        for (const item of show.continuityItems) {
          if (
            item.media &&
            item.media.state === "Ready" &&
            state.some((x) => x.mediaID === item.media!.id)
          ) {
            const r = await addOrReplaceMediaAsScene(
              {
                ...item.media,
                continuityItem: item,
              },
              "replace",
            );
            if (r.done) {
              done++;
            } else if (r.warnings.length > 0) {
              warnings.push(item.name + ": " + r.warnings.join(" "));
            }
          }
        }
        return { done, warnings };
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
          host: z.string().optional(),
          port: z.number().optional(),
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
          host: conn.host,
          port: conn.port,
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
        await loadAssets(assets);
      }),
  }),
  assets: r({
    getSettings: proc
      .output(assetsSettingsSchema)
      .query(() => getAssetsSettings()),
  }),
  ontime: r({
    getSettings: proc
      .output(ontimeSettingsSchema.nullable())
      .query(async () => {
        return getOntimeSettings();
      }),
    getConnectionStatus: proc
      .output(z.object({ host: z.string() }).nullable())
      .query(async () => {
        if (!isOntimeConnected()) {
          return null;
        }
        return { host: getOntimeInstance().host };
      }),
    connect: proc
      .input(ontimeSettingsSchema)
      .output(z.boolean())
      .mutation(async ({ input }) => {
        await createOntimeConnection(input.host);
        await saveOntimeSettings(input);
        return true;
      }),
    pushEvents: proc
      .input(
        z.object({
          rundownId: z.number().optional(),
          replacementMode: z.enum(["force"]).optional(),
        }),
      )
      .output(
        z.object({
          done: z.boolean(),
        }),
      )
      .mutation(async ({ input }) => {
        const show = selectedShow.value;
        invariant(show, "No show selected");
        const events = showToOntimeEvents(show, input.rundownId);
        console.log("Ready for Ontime push");
        console.dir(events);

        const current = await getOntimeInstance().getEvents();
        if (input.replacementMode === "force" || current.length === 0) {
          const ontime = await getOntimeInstance();
          await ontime.deleteAllEvents();
          // Not in a Promise.all to ensure they're done in order
          // NB: A new event is added to the *top* of the rundown in Ontime, so we need to add them in reverse order
          for (const event of events.reverse()) {
            await ontime.createEvent(event);
          }
          return { done: true };
        }

        if (current.length !== events.length) {
          return { done: false };
        }
        for (let i = 0; i < current.length; i++) {
          if (events[i] && current[i].title !== events[i].title) {
            return { done: false };
          }
        }
        return { done: true };
      }),
  }),
});
export type AppRouter = typeof appRouter;

if (process.env.E2E_TEST === "true") {
  ipcMain.on("doIPCMutation", async (_, proc: string, input: unknown) => {
    await callProcedure({
      procedures: appRouter._def.procedures,
      path: proc,
      rawInput: input,
      ctx: {},
      type: "mutation",
    });
  });
}
