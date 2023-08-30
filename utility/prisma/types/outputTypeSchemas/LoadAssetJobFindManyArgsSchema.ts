import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereInputSchema";
import { LoadAssetJobOrderByWithRelationInputSchema } from "../inputTypeSchemas/LoadAssetJobOrderByWithRelationInputSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobScalarFieldEnumSchema } from "../inputTypeSchemas/LoadAssetJobScalarFieldEnumSchema";

export const LoadAssetJobFindManyArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobFindManyArgs, "select" | "include">
> = z
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
    distinct: z
      .union([
        LoadAssetJobScalarFieldEnumSchema,
        LoadAssetJobScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

export default LoadAssetJobFindManyArgsSchema;
