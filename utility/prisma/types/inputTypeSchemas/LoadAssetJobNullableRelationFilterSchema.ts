import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";

export const LoadAssetJobNullableRelationFilterSchema: z.ZodType<Prisma.LoadAssetJobNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => LoadAssetJobWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => LoadAssetJobWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default LoadAssetJobNullableRelationFilterSchema;
