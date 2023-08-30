import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereInputSchema } from "../inputTypeSchemas/DummyTestJobWhereInputSchema";
import { DummyTestJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/DummyTestJobOrderByWithRelationInputSchema";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobScalarFieldEnumSchema } from "../inputTypeSchemas/DummyTestJobScalarFieldEnumSchema";

export const DummyTestJobFindFirstOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobFindFirstOrThrowArgs, "select" | "include">
> = z
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
    distinct: z
      .union([
        DummyTestJobScalarFieldEnumSchema,
        DummyTestJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export default DummyTestJobFindFirstOrThrowArgsSchema;
