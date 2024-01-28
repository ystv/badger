import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { EnumSettingsCategoryWithAggregatesFilterSchema } from "./EnumSettingsCategoryWithAggregatesFilterSchema";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { EnumSettingKeyWithAggregatesFilterSchema } from "./EnumSettingKeyWithAggregatesFilterSchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { JsonWithAggregatesFilterSchema } from "./JsonWithAggregatesFilterSchema";

export const SettingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SettingScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      category: z
        .union([
          z.lazy(() => EnumSettingsCategoryWithAggregatesFilterSchema),
          z.lazy(() => SettingsCategorySchema),
        ])
        .optional(),
      key: z
        .union([
          z.lazy(() => EnumSettingKeyWithAggregatesFilterSchema),
          z.lazy(() => SettingKeySchema),
        ])
        .optional(),
      value: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
    })
    .strict();

export default SettingScalarWhereWithAggregatesInputSchema;
