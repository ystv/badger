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
  MediaUpdateInputSchema,
} from "@bowser/prisma/types";
import invariant from "@/lib/invariant";
import { dispatchJobForJobrunner } from "@/lib/jobs";

const ExtendedMediaModelWithDownloadURL = ExtendedMediaModel.extend({
  continuityItems: z.array(ContinuityItemSchema),
  rundownItems: z.array(RundownItemSchema),
  assets: z.array(AssetSchema),
  downloadURL: z.string().optional().nullable(),
});

const CompleteMediaModel = ExtendedMediaModel.extend({
  continuityItems: z.array(
    ContinuityItemSchema.extend({
      show: ShowSchema,
    }),
  ),
  rundownItems: z.array(
    RundownItemSchema.extend({
      rundown: RundownSchema.extend({
        show: ShowSchema,
      }),
    }),
  ),
  assets: z.array(
    AssetSchema.extend({
      rundown: RundownSchema.extend({
        show: ShowSchema,
      }),
    }),
  ),
});

export const appRouter = router({
  ping: publicProcedure.query(() => {
    return {
      ping: "pong",
      version: process.env.NEXT_PUBLIC_VERSION!,
    };
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
            continuityItems: true,
            rundownItems: true,
            assets: true,
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
          process: z.boolean(),
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
                  rundownItems: {
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
                  continuityItems: {
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
          let job;
          if (input.process) {
            job = await $db.processMediaJob.create({
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
          }
          return [med, job] as const;
        });
        if (job) {
          await dispatchJobForJobrunner(job.base_job_id);
        }
        return media;
      }),
    update: e2eProcedure
      .input(
        z.object({
          id: z.number(),
          data: MediaUpdateInputSchema,
        }),
      )
      .output(MediaSchema)
      .mutation(async ({ input }) => {
        return db.media.update({
          where: {
            id: input.id,
          },
          data: input.data,
        });
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
            continuityItems: {
              include: {
                show: true,
              },
            },
            rundownItems: {
              include: {
                rundown: {
                  include: {
                    show: true,
                  },
                },
              },
            },
            assets: {
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
