import { z } from "zod";
import { proc, r } from "../base/ipcRouter";
import { createVMixConnection, getVMixConnection } from "./vmix";
import invariant from "../../common/invariant";
import { TRPCError } from "@trpc/server";
import {
  addSingleItemToList,
  loadSingleMedia,
  reconcileList,
} from "./vmixHelpers";
import { VMIX_NAMES } from "../../common/constants";
import { getLocalMedia } from "../media/mediaManagement";
import { selectedShow } from "../base/selectedShow";
import { Asset, Media } from "@badger/prisma/types";

export const vmixRouter = r({
  getConnectionState: proc
    .output(
      z.object({
        connected: z.boolean(),
        host: z.string().optional(),
        port: z.number().optional(),
        version: z.string().optional(),
        edition: z.string().optional(),
        loadRundownItems: z.boolean().optional(),
        loadContinuityItems: z
          .union([z.enum(["list", "loose"]), z.literal(false)])
          .optional()
          .default(false),
        loadAssets: z.boolean().optional(),
      }),
    )
    .query(async () => {
      // TODO[BDGR-136]: don't use the connection for this
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
  loadSingleItem: proc
    .input(
      z.object({
        type: z.enum(["rundownItem", "continuityItem", "asset"]),
        id: z.number(),
        rundownId: z.number().optional(),
        mode: z.enum(["list", "loose"]),
      }),
    )
    .mutation(async ({ input }) => {
      const show = selectedShow.value;
      invariant(show, "No show selected");
      let media: Media | null;
      let asset: (Asset & { media: Media }) | undefined;
      switch (input.type) {
        case "rundownItem": {
          invariant(input.rundownId, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === input.rundownId);
          invariant(rundown, `Rundown ${input.rundownId} not found`);
          const item = rundown.items.find((x) => x.id === input.id);
          invariant(item, `Item ${input.id} not found`);
          media = item.media;
          break;
        }
        case "asset": {
          invariant(input.rundownId, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === input.rundownId);
          invariant(rundown, `Rundown ${input.rundownId} not found`);
          asset = rundown.assets.find((x) => x.id === input.id);
          invariant(asset, `Asset ${input.id} not found`);
          media = asset.media;
          break;
        }
        case "continuityItem": {
          const item = show.continuityItems.find((x) => x.id === input.id);
          invariant(item, `Continuity item ${input.id} not found`);
          media = item.media;
          break;
        }
      }
      if (!media || media.state !== "Ready") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Media not ready",
        });
      }
      const locals = getLocalMedia();
      const local = locals.find((x) => x.mediaID === media.id);
      if (!local) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Media not downloaded locally",
        });
      }

      switch (input.mode) {
        case "list": {
          let list;
          switch (input.type) {
            case "rundownItem":
              list = VMIX_NAMES.VTS_LIST;
              break;
            case "asset":
              invariant(asset, "Asset not found");
              list = asset.category;
              break;
            case "continuityItem":
              list = VMIX_NAMES.CONTINUITY_LIST;
              break;
          }
          await addSingleItemToList(list, media);
          break;
        }
        case "loose":
          await loadSingleMedia(media, media.name);
          break;
      }
    }),
  bulkLoad: proc
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
        mode: z.enum(["list", "loose"]),
        force: z.boolean().default(false),
      }),
    )
    .output(
      z.discriminatedUnion("ok", [
        z.object({
          ok: z.literal(true),
        }),
        z.object({
          ok: z.literal(false),
          reason: z.enum(["playing"]),
        }),
      ]),
    )
    .mutation(async ({ input }) => {
      const show = selectedShow.value;
      invariant(show, "No show selected");
      let sources: Array<{ media: Media | null; name: string }>;
      let listName;
      const source = input.source;
      switch (source.type) {
        case "rundownItems": {
          invariant(source.rundownID, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === source.rundownID);
          invariant(rundown, `Rundown ${source.rundownID} not found`);
          sources = rundown.items.sort((a, b) => a.order - b.order);
          listName = VMIX_NAMES.VTS_LIST;
          break;
        }
        case "rundownAssets": {
          invariant(source.rundownID, "Rundown ID required");
          const rundown = show.rundowns.find((x) => x.id === source.rundownID);
          invariant(rundown, `Rundown ${source.rundownID} not found`);
          sources = rundown.assets.filter(
            (x) => x.category === source.category,
          );
          listName = source.category;
          break;
        }
        case "continuityItems": {
          sources = show.continuityItems;
          listName = VMIX_NAMES.CONTINUITY_LIST;
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
      switch (input.mode) {
        case "list": {
          const paths = sources.map((source) => {
            const local = locals.find((x) => x.mediaID === source.media!.id);
            invariant(local, "No local media for asset");
            return local.path;
          });
          return await reconcileList(listName, paths, input.force);
        }
        case "loose":
          for (const item of sources) {
            await loadSingleMedia(item.media!, item.name);
          }
          return { ok: true };
        default:
          invariant(false, "Invalid mode");
      }
    }),
});
