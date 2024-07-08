import { z } from "zod";
import { proc, r } from "../base/ipcRouter";
import { createOBSConnection, obsConnection } from "./obs";
import { addOrReplaceMediaAsScene, findScenes } from "./obsHelpers";
import { getLogger } from "loglevel";
import { serverAPI } from "../base/serverApiClient";
import invariant from "../../common/invariant";
import { selectedShow } from "../base/selectedShow";
import { getDevToolsConfig, getOBSSettings } from "../base/settings";
import { TRPCError } from "@trpc/server";
import { getLocalMedia } from "../media/mediaManagement";
import { Media } from "@badger/prisma/types";

const logger = getLogger("obs/ipc");

export const obsRouter = r({
  getConnectionState: proc
    .output(
      z.object({
        connected: z.boolean(),
        version: z.string().optional(),
        platform: z.string().optional(),
        error: z.string().optional(),
        availableRequests: z.array(z.string()).optional(),
        loadContinuityItems: z.boolean().optional(),
        loadRundownItems: z.boolean().optional(),
        loadAssets: z.boolean().optional(),
      }),
    )
    .query(async () => {
      // TODO[BDGR-136]: don't use the connection for this
      if (obsConnection === null) {
        return { connected: false };
      }
      try {
        const [version, settings] = await Promise.all([
          obsConnection.ping(),
          getOBSSettings(),
        ]);
        invariant(settings, "connected to OBS without settings");
        return {
          connected: true,
          version: version.obsVersion,
          platform: version.platformDescription,
          availableRequests: version.availableRequests,
        };
      } catch (e) {
        logger.warn("OBS connection error", e);
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
        containerType: z.enum(["rundownItem", "continuityItem", "asset"]),
        containerId: z.number(),
        rundownId: z.number().optional(),
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
      const show = selectedShow.value;
      invariant(show, "No show selected");
      let container;
      switch (input.containerType) {
        case "rundownItem":
          invariant(input.rundownId, "rundownId required for rundownItem");
          container = show.rundowns
            .find((x) => x.id === input.rundownId)
            ?.items?.find((x) => x.id === input.containerId);
          break;
        case "continuityItem":
          container = show.continuityItems.find(
            (x) => x.id === input.containerId,
          );
          break;
        case "asset":
          invariant(input.rundownId, "rundownId required for rundownItem");
          container = show.rundowns
            .find((x) => x.id === input.rundownId)
            ?.assets?.find((x) => x.id === input.containerId);
          break;
      }
      invariant(container, "item not found");
      invariant(container.mediaId, "tried to add item with no media");
      const info = await serverAPI().media.get.query({ id: container.mediaId });
      invariant(
        info.continuityItems.length > 0,
        "obs.addMediaAsScene: No continuity item for media in obs.addMediaAsScene",
      );
      return await addOrReplaceMediaAsScene(
        {
          ...info,
          containerType: input.containerType,
          containerId: input.containerId,
          containerName: container.name,
          order: container.order,
        },
        input.replaceMode,
      );
    }),
  bulkAddMedia: proc
    .input(
      z.object({
        source: z.discriminatedUnion("type", [
          z.object({ type: z.literal("rundownItems"), rundownID: z.number() }),
          z.object({
            type: z.literal("rundownAssets"),
            rundownID: z.number(),
            category: z.string(),
          }),
          z.object({ type: z.literal("continuityItems") }),
        ]),
      }),
    )
    .mutation(async ({ input }) => {
      const show = selectedShow.value;
      invariant(show, "No show selected");
      let sources: Array<{
        media: Media | null;
        name: string;
        id: number;
        order: number;
      }>;
      const source = input.source;
      switch (source.type) {
        case "rundownItems": {
          invariant(source.rundownID, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === source.rundownID);
          invariant(rundown, `Rundown ${source.rundownID} not found`);
          sources = rundown.items.sort((a, b) => a.order - b.order);
          break;
        }
        case "rundownAssets": {
          invariant(source.rundownID, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === source.rundownID);
          invariant(rundown, `Rundown ${source.rundownID} not found`);
          sources = rundown.assets
            .filter((x) => x.category === source.category)
            .sort((a, b) => a.order - b.order);
          break;
        }
        case "continuityItems": {
          sources = show.continuityItems.sort((a, b) => a.order - b.order);
          break;
        }
        default:
          invariant(false, "Unknown source type");
      }
      if (sources.some((x) => !x.media || x.media.state !== "Ready")) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Not all media is ready",
        });
      }
      const locals = getLocalMedia();
      for (const source of sources) {
        if (
          source.media &&
          locals.some((x) => x.mediaID === source.media!.id)
        ) {
          await addOrReplaceMediaAsScene(
            {
              ...source.media,
              containerType: input.source.type.replace(/s$/, "") as
                | "rundownItem"
                | "continuityItem"
                | "asset",
              containerId: source.id,
              containerName: source.name,
              order: source.order,
            },
            "replace",
          );
        }
      }
    }),
  listBadgerScenes: proc
    .output(
      z.array(
        z.object({
          sceneName: z.string(),
          type: z.enum(["rundownItem", "continuityItem", "asset"]),
          itemId: z.number(),
          sources: z.array(
            z.object({
              mediaID: z.number().optional(),
            }),
          ),
        }),
      ),
    )
    .query(async () => {
      return await findScenes();
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
});
