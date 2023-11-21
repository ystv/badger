import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedEnumSettingsCategoryFilterSchema } from "./NestedEnumSettingsCategoryFilterSchema";

export const NestedEnumSettingsCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSettingsCategoryWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => SettingsCategorySchema).optional(),
      in: z
        .lazy(() => SettingsCategorySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SettingsCategorySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => SettingsCategorySchema),
          z.lazy(() => NestedEnumSettingsCategoryWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumSettingsCategoryFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumSettingsCategoryFilterSchema).optional(),
    })
    .strict();

export default NestedEnumSettingsCategoryWithAggregatesFilterSchema;
