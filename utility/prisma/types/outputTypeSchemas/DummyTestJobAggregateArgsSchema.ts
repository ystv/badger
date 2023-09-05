import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereInputSchema } from "../inputTypeSchemas/DummyTestJobWhereInputSchema";
import { DummyTestJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/DummyTestJobOrderByWithRelationInputSchema";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobAggregateArgsSchema: z.ZodType<Prisma.DummyTestJobAggregateArgs> =
  z
    .object({
      where: DummyTestJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          DummyTestJobOrderByWithRelationInputSchema.array(),
          DummyTestJobOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DummyTestJobWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default DummyTestJobAggregateArgsSchema;
