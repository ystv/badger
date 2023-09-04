import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";

export const NestedEnumAssetTypeFilterSchema: z.ZodType<Prisma.NestedEnumAssetTypeFilter> =
  z
    .object({
      equals: z.lazy(() => AssetTypeSchema).optional(),
      in: z
        .lazy(() => AssetTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => AssetTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => AssetTypeSchema),
          z.lazy(() => NestedEnumAssetTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export default NestedEnumAssetTypeFilterSchema;
