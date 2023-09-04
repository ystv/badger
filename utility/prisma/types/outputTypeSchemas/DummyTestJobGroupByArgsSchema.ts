import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereInputSchema } from "../inputTypeSchemas/DummyTestJobWhereInputSchema";
import { DummyTestJobOrderByWithAggregationInputSchema } from "../inputTypeSchemas/DummyTestJobOrderByWithAggregationInputSchema";
import { DummyTestJobScalarFieldEnumSchema } from "../inputTypeSchemas/DummyTestJobScalarFieldEnumSchema";
import { DummyTestJobScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/DummyTestJobScalarWhereWithAggregatesInputSchema";

export const DummyTestJobGroupByArgsSchema: z.ZodType<Prisma.DummyTestJobGroupByArgs> =
  z
    .object({
      where: DummyTestJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          DummyTestJobOrderByWithAggregationInputSchema.array(),
          DummyTestJobOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: DummyTestJobScalarFieldEnumSchema.array(),
      having: DummyTestJobScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default DummyTestJobGroupByArgsSchema;
