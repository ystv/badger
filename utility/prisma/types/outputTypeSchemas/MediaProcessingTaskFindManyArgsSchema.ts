import { z } from "zod";
import type { Prisma } from "../../client";
import { MediaProcessingTaskWhereInputSchema } from "../inputTypeSchemas/MediaProcessingTaskWhereInputSchema";
import { MediaProcessingTaskOrderByWithRelationInputSchema } from "../inputTypeSchemas/MediaProcessingTaskOrderByWithRelationInputSchema";
import { MediaProcessingTaskWhereUniqueInputSchema } from "../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema";
import { MediaProcessingTaskScalarFieldEnumSchema } from "../inputTypeSchemas/MediaProcessingTaskScalarFieldEnumSchema";

export const MediaProcessingTaskFindManyArgsSchema: z.ZodType<
  Omit<Prisma.MediaProcessingTaskFindManyArgs, "select" | "include">
> = z
  .object({
    where: MediaProcessingTaskWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaProcessingTaskOrderByWithRelationInputSchema.array(),
        MediaProcessingTaskOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MediaProcessingTaskScalarFieldEnumSchema,
        MediaProcessingTaskScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export default MediaProcessingTaskFindManyArgsSchema;
