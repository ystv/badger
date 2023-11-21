import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumSettingsCategoryFilterSchema } from "./EnumSettingsCategoryFilterSchema";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { EnumSettingKeyFilterSchema } from "./EnumSettingKeyFilterSchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { JsonFilterSchema } from "./JsonFilterSchema";

export const SettingWhereInputSchema: z.ZodType<Prisma.SettingWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    category: z
      .union([
        z.lazy(() => EnumSettingsCategoryFilterSchema),
        z.lazy(() => SettingsCategorySchema),
      ])
      .optional(),
    key: z
      .union([
        z.lazy(() => EnumSettingKeyFilterSchema),
        z.lazy(() => SettingKeySchema),
      ])
      .optional(),
    value: z.lazy(() => JsonFilterSchema).optional(),
  })
  .strict();

export default SettingWhereInputSchema;
