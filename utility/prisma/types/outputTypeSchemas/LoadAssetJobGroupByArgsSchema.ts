import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereInputSchema";
import { LoadAssetJobOrderByWithAggregationInputSchema } from "../inputTypeSchemas/LoadAssetJobOrderByWithAggregationInputSchema";
import { LoadAssetJobScalarFieldEnumSchema } from "../inputTypeSchemas/LoadAssetJobScalarFieldEnumSchema";
import { LoadAssetJobScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/LoadAssetJobScalarWhereWithAggregatesInputSchema";

export const LoadAssetJobGroupByArgsSchema: z.ZodType<Prisma.LoadAssetJobGroupByArgs> =
  z
    .object({
      where: LoadAssetJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          LoadAssetJobOrderByWithAggregationInputSchema.array(),
          LoadAssetJobOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: LoadAssetJobScalarFieldEnumSchema.array(),
      having: LoadAssetJobScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default LoadAssetJobGroupByArgsSchema;
