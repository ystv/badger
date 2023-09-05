import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const AssetRelationFilterSchema: z.ZodType<Prisma.AssetRelationFilter> =
  z
    .object({
      is: z.lazy(() => AssetWhereInputSchema).optional(),
      isNot: z.lazy(() => AssetWhereInputSchema).optional(),
    })
    .strict();

export default AssetRelationFilterSchema;
