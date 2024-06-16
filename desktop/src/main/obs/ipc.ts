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
          loadContinuityItems: settings.loadContinuityItems,
          loadRundownItems: settings.loadRundownItems,
          loadAssets: settings.loadAssets,
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
        "No continuity item for media in obs.addMediaAsScene",
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
      const state = getLocalMedia();
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
              containerType: "continuityItem",
              containerId: item.id,
              containerName: item.name,
              order: item.order,
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
