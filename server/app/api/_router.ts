import { e2eProcedure, publicProcedure, router } from "./_base";
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
  MediaFileSourceTypeSchema,
  MediaSchema,
  RundownItemSchema,
  ShowCreateInputSchema,
} from "@bowser/prisma/types";
import invariant from "@/lib/invariant";
import { dispatchJobForJobrunner } from "@/lib/jobs";

const ExtendedMediaModelWithDownloadURL = CompleteMediaModel.extend({
  continuityItem: ContinuityItemSchema.nullable(),
  rundownItem: RundownItemSchema.nullable(),
  downloadURL: z.string().optional().nullable(),
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
    create: e2eProcedure
      .input(ShowCreateInputSchema)
      .output(CompleteShowModel)
      .mutation(async ({ input }) => {
        const res = await db.show.create({
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
        return res;
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
    create: e2eProcedure
      .input(
        z.object({
          sourceType: MediaFileSourceTypeSchema,
          source: z.string(),
          fileName: z.string(),
          targetType: z.enum(["rundownItem", "continuityItem"]), // TODO: support assets
          targetID: z.number(),
        }),
      )
      .output(MediaSchema)
      .mutation(async ({ input }) => {
        const [media, job] = await db.$transaction(async ($db) => {
          let med;
          switch (input.targetType) {
            case "rundownItem":
              med = await $db.media.create({
                data: {
                  name: input.fileName,
                  rawPath: "",
                  durationSeconds: 0,
                  rundownItem: {
                    connect: {
                      id: input.targetID,
                    },
                  },
                },
              });
              break;
            case "continuityItem":
              med = await $db.media.create({
                data: {
                  name: input.fileName,
                  rawPath: "",
                  durationSeconds: 0,
                  continuityItem: {
                    connect: {
                      id: input.targetID,
                    },
                  },
                },
              });
              break;
            default:
              invariant(false, "Invalid target type " + input.targetType);
          }
          const job = await $db.processMediaJob.create({
            data: {
              sourceType: input.sourceType,
              source: input.source,
              media: {
                connect: {
                  id: med.id,
                },
              },
              base_job: {
                create: {},
              },
            },
          });
          return [med, job] as const;
        });
        await dispatchJobForJobrunner(job.base_job_id);
        return media;
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
