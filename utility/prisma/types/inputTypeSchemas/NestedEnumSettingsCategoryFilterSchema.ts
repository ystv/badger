import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingsCategorySchema } from "./SettingsCategorySchema";

export const NestedEnumSettingsCategoryFilterSchema: z.ZodType<Prisma.NestedEnumSettingsCategoryFilter> =
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
          z.lazy(() => NestedEnumSettingsCategoryFilterSchema),
        ])
        .optional(),
    })
    .strict();

export default NestedEnumSettingsCategoryFilterSchema;
