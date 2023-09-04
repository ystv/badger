import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereInputSchema";
import { ProcessMediaJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/ProcessMediaJobOrderByWithRelationInputSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobAggregateArgsSchema: z.ZodType<Prisma.ProcessMediaJobAggregateArgs> =
  z
    .object({
      where: ProcessMediaJobWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProcessMediaJobOrderByWithRelationInputSchema.array(),
          ProcessMediaJobOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProcessMediaJobWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export default ProcessMediaJobAggregateArgsSchema;
