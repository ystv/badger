import { e2eProcedure, publicProcedure, router } from "./_base";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  ExtendedMediaModel,
  CompleteRundownModel,
  CompleteShowModel,
} from "@bowser/prisma/utilityTypes";
import { getPresignedURL } from "@/lib/s3";
import {
  ContinuityItemSchema,
  MediaFileSourceTypeSchema,
  MediaSchema,
  RundownItemSchema,
  ShowCreateInputSchema,
  AssetSchema,
  RundownSchema,
  ShowSchema,
  ShowUpdateInputSchema,
} from "@bowser/prisma/types";
import invariant from "@/lib/invariant";
import { dispatchJobForJobrunner } from "@/lib/jobs";

const ExtendedMediaModelWithDownloadURL = ExtendedMediaModel.extend({
  continuityItem: ContinuityItemSchema.nullable(),
  rundownItem: RundownItemSchema.nullable(),
  asset: AssetSchema.nullable(),
  downloadURL: z.string().optional().nullable(),
});

const CompleteMediaModel = ExtendedMediaModel.extend({
  continuityItem: ContinuityItemSchema.extend({
    show: ShowSchema,
  }).nullable(),
  rundownItem: RundownItemSchema.extend({
    rundown: RundownSchema.extend({
      show: ShowSchema,
    }),
  }).nullable(),
  asset: AssetSchema.extend({
    rundown: RundownSchema.extend({
      show: ShowSchema,
    }),
  }).nullable(),
});

export const appRouter = router({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
  shows: router({
    listUpcoming: publicProcedure
      .output(z.array(ShowSchema))
      .query(async () => {
        return db.showWithDuration.findMany({
          where: {
            end: {
              gte: new Date(),
            },
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
              orderBy: {
                order: "asc",
              },
            },
            rundowns: {
              include: {
                items: {
                  include: {
                    media: true,
                  },
                  orderBy: {
                    order: "asc",
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
    update: e2eProcedure
      .input(
        z.object({
          id: z.number(),
          data: ShowUpdateInputSchema,
        }),
      )
      .output(CompleteShowModel)
      .mutation(async ({ input }) => {
        const res = await db.show.update({
          where: {
            id: input.id,
          },
          data: input.data,
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
        // Need this Omit to ensure that this findFirstOrThrow works while assuring type
        // safety for all the other fields of ExtendedMediaModelWithDownloadURL
        const obj: Omit<
          z.infer<typeof ExtendedMediaModelWithDownloadURL>,
          "downloadURL"
        > = await db.media.findFirstOrThrow({
          where: {
            id: input.id,
          },
          include: {
            tasks: true,
            continuityItem: true,
            rundownItem: true,
            asset: true,
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
              await $db.rundownItem.update({
                where: {
                  id: input.targetID,
                },
                data: {
                  rundown: {
                    update: {
                      show: {
                        update: {
                          version: {
                            increment: 1,
                          },
                        },
                      },
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
              await $db.continuityItem.update({
                where: {
                  id: input.targetID,
                },
                data: {
                  show: {
                    update: {
                      version: {
                        increment: 1,
                      },
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
    bulkGet: publicProcedure
      .input(z.array(z.number()))
      .output(z.array(CompleteMediaModel))
      .query(async ({ input }) => {
        return await db.media.findMany({
          where: {
            id: {
              in: input,
            },
          },
          include: {
            tasks: true,
            continuityItem: {
              include: {
                show: true,
              },
            },
            rundownItem: {
              include: {
                rundown: {
                  include: {
                    show: true,
                  },
                },
              },
            },
            asset: {
              include: {
                rundown: {
                  include: {
                    show: true,
                  },
                },
              },
            },
          },
        });
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
