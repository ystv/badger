import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereInputSchema";
import { ProcessMediaJobOrderByWithAggregationInputSchema } from "../inputTypeSchemas/ProcessMediaJobOrderByWithAggregationInputSchema";
import { ProcessMediaJobScalarFieldEnumSchema } from "../inputTypeSchemas/ProcessMediaJobScalarFieldEnumSchema";
import { ProcessMediaJobScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/ProcessMediaJobScalarWhereWithAggregatesInputSchema";

export const ProcessMediaJobGroupByArgsSchema: z.ZodType<Prisma.ProcessMediaJobGroupByArgs> =
  z
    .object({
      where: ProcessMediaJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProcessMediaJobOrderByWithAggregationInputSchema.array(),
          ProcessMediaJobOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ProcessMediaJobScalarFieldEnumSchema.array(),
      having: ProcessMediaJobScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default ProcessMediaJobGroupByArgsSchema;
