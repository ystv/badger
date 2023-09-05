import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereInputSchema";
import { ProcessMediaJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/ProcessMediaJobOrderByWithRelationInputSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobScalarFieldEnumSchema } from "../inputTypeSchemas/ProcessMediaJobScalarFieldEnumSchema";

export const ProcessMediaJobFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobFindFirstOrThrowArgs, "select" | "include">
> = z
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
    distinct: z
      .union([
        ProcessMediaJobScalarFieldEnumSchema,
        ProcessMediaJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export default ProcessMediaJobFindFirstOrThrowArgsSchema;
