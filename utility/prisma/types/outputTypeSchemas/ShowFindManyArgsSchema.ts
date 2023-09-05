import { z } from "zod";
import type { Prisma } from "../../client";
import { ShowWhereInputSchema } from "../inputTypeSchemas/ShowWhereInputSchema";
import { ShowOrderByWithRelationInputSchema } from "../inputTypeSchemas/ShowOrderByWithRelationInputSchema";
import { ShowWhereUniqueInputSchema } from "../inputTypeSchemas/ShowWhereUniqueInputSchema";
import { ShowScalarFieldEnumSchema } from "../inputTypeSchemas/ShowScalarFieldEnumSchema";

export const ShowFindManyArgsSchema: z.ZodType<
  Omit<Prisma.ShowFindManyArgs, "select" | "include">
> = z
  .object({
    where: ShowWhereInputSchema.optional(),
    orderBy: z
      .union([
        ShowOrderByWithRelationInputSchema.array(),
        ShowOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ShowWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ShowScalarFieldEnumSchema, ShowScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export default ShowFindManyArgsSchema;
