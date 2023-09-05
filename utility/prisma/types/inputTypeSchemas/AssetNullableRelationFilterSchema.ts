import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const AssetNullableRelationFilterSchema: z.ZodType<Prisma.AssetNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => AssetWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => AssetWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default AssetNullableRelationFilterSchema;
