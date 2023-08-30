import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereInputSchema";
import { LoadAssetJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/LoadAssetJobOrderByWithRelationInputSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobAggregateArgsSchema: z.ZodType<Prisma.LoadAssetJobAggregateArgs> =
  z
    .object({
      where: LoadAssetJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          LoadAssetJobOrderByWithRelationInputSchema.array(),
          LoadAssetJobOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: LoadAssetJobWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default LoadAssetJobAggregateArgsSchema;
