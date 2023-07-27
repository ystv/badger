import { publicProcedure, router } from "./_base";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  CompleteMediaModel,
  CompleteShowModel,
  PartialShowModel,
} from "@/lib/db/utilityTypes";
import { getPresignedURL } from "@/lib/s3";
import { ContinuityItemSchema, RundownItemSchema } from "@/lib/db/types";

const ExtendedMediaModelWithDownloadURL = CompleteMediaModel.extend({
  continuityItem: ContinuityItemSchema.nullable(),
  rundownItem: RundownItemSchema.nullable(),
  downloadURL: z.string().nullable(),
});
export const appRouter = router({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
  shows: router({
    listUpcoming: publicProcedure
      .output(z.array(PartialShowModel))
      .query(async () => {
        return db.show.findMany({
          where: {
            start: {
              gte: new Date(),
            },
          },
          include: {
            continuityItems: true,
            rundowns: true,
          },
        });
      }),
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .output(CompleteShowModel)
      .query(async ({ input }) => {
        return db.show.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            continuityItems: {
              include: {
                media: true,
              },
            },
            rundowns: {
              include: {
                items: {
                  include: {
                    media: true,
                  },
                },
              },
            },
          },
        });
      }),
  }),
  media: router({
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .output(ExtendedMediaModelWithDownloadURL)
      .query(async ({ input }) => {
        const obj = await db.media.findFirstOrThrow({
          where: {
            id: input.id,
          },
          include: {
            tasks: true,
            continuityItem: true,
            rundownItem: true,
          },
        });
        if (obj.path !== null) {
          (
            obj as z.infer<typeof ExtendedMediaModelWithDownloadURL>
          ).downloadURL = await getPresignedURL(obj.path);
        }
        return obj as z.infer<typeof ExtendedMediaModelWithDownloadURL>;
      }),
  }),
});

export type AppRouter = typeof appRouter;
