import { publicProcedure, router, testOnlyProcedure } from "./_base";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  CompleteMediaModel,
  CompleteRundownModel,
  CompleteShowModel,
  PartialShowModel,
} from "@bowser/prisma/utilityTypes";
import { getPresignedURL } from "@/lib/s3";
import {
  ContinuityItemSchema,
  MediaCreateInputSchema,
  MediaFileSourceTypeSchema,
  RundownItemSchema,
  ShowCreateInputSchema,
} from "@bowser/prisma/types";
import { dispatchJobForJobrunner } from "@/lib/jobs";

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
                assets: {
                  include: {
                    media: true,
                  },
                },
              },
            },
          },
        });
      }),
    getVersion: publicProcedure
      .input(z.object({ id: z.number() }))
      .output(z.object({ version: z.number() }))
      .query(async ({ input }) => {
        const obj = await db.show.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          select: {
            version: true,
          },
        });
        return obj;
      }),
    create: testOnlyProcedure
      .input(ShowCreateInputSchema)
      .output(CompleteShowModel)
      .mutation(async ({ input }) => {
        return await db.show.create({
          data: input,
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
                assets: {
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
    create: testOnlyProcedure
      .input(
        z.object({
          media: MediaCreateInputSchema,
          sourceType: MediaFileSourceTypeSchema,
          source: z.string(),
        }),
      )
      .output(ExtendedMediaModelWithDownloadURL)
      .mutation(async ({ input }) => {
        const [media, job] = await db.$transaction(async ($db) => {
          const media = await $db.media.create({
            data: input.media,
            include: {
              rundownItem: true,
              continuityItem: true,
              tasks: true,
            },
          });
          const job = await $db.processMediaJob.create({
            data: {
              sourceType: input.sourceType,
              source: input.source,
              media: {
                connect: {
                  id: media.id,
                },
              },
              base_job: { create: {} },
            },
          });
          return [media, job] as const;
        });
        await dispatchJobForJobrunner(job.base_job_id);
        return {
          ...media,
          downloadURL: null,
        };
      }),
  }),
  rundowns: router({
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .output(CompleteRundownModel)
      .query(async ({ input }) => {
        return db.rundown.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            items: {
              include: {
                media: true,
              },
            },
            assets: {
              include: {
                media: true,
              },
            },
          },
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
