import { z } from "zod";
import { proc, r } from "../base/ipcRouter";
import { createOBSConnection, obsConnection } from "./obs";
import { addOrReplaceMediaAsScene, findContinuityScenes } from "./obsHelpers";
import { getLogger } from "loglevel";
import { serverAPI } from "../base/serverApiClient";
import invariant from "../../common/invariant";
import { selectedShow } from "../base/selectedShow";
import { getDevToolsConfig } from "../base/settings";
import { TRPCError } from "@trpc/server";
import { getLocalMedia } from "../media/mediaManagement";

const logger = getLogger("obs/ipc");

export const obsRouter = r({
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
        info.continuityItems.length > 0,
        "obs.addMediaAsScene: No continuity item for media in obs.addMediaAsScene",
      );
      return await addOrReplaceMediaAsScene(info, input.replaceMode);
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
              continuityItems: [item],
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
});
