import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { NestedEnumAssetTypeWithAggregatesFilterSchema } from "./NestedEnumAssetTypeWithAggregatesFilterSchema";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedEnumAssetTypeFilterSchema } from "./NestedEnumAssetTypeFilterSchema";

export const EnumAssetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAssetTypeWithAggregatesFilter> =
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
          z.lazy(() => NestedEnumAssetTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumAssetTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumAssetTypeFilterSchema).optional(),
    })
    .strict();

export default EnumAssetTypeWithAggregatesFilterSchema;
