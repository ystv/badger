import { e2eProcedure, publicProcedure, router } from "./_base";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  ExtendedMediaModel,
  CompleteRundownModel,
  CompleteShowModel,
  PartialShowModel,
} from "@bowser/prisma/utilityTypes";
import { getPresignedURL } from "@/lib/s3";
import {
  ContinuityItemSchema,
  RundownItemSchema,
  ShowCreateInputSchema,
  AssetSchema,
  RundownSchema,
  ShowSchema,
} from "@bowser/prisma/types";

const ExtendedMediaModelWithDownloadURL = ExtendedMediaModel.extend({
  continuityItem: ContinuityItemSchema.nullable(),
  rundownItem: RundownItemSchema.nullable(),
  asset: AssetSchema.nullable(),
  downloadURL: z.string().nullable(),
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
