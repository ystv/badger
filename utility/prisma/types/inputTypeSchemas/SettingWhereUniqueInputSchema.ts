import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingCategoryKeyCompoundUniqueInputSchema } from "./SettingCategoryKeyCompoundUniqueInputSchema";
import { SettingWhereInputSchema } from "./SettingWhereInputSchema";
import { EnumSettingsCategoryFilterSchema } from "./EnumSettingsCategoryFilterSchema";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { EnumSettingKeyFilterSchema } from "./EnumSettingKeyFilterSchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { JsonFilterSchema } from "./JsonFilterSchema";

export const SettingWhereUniqueInputSchema: z.ZodType<Prisma.SettingWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number(),
        category_key: z.lazy(() => SettingCategoryKeyCompoundUniqueInputSchema),
      }),
      z.object({
        id: z.number(),
      }),
      z.object({
        category_key: z.lazy(() => SettingCategoryKeyCompoundUniqueInputSchema),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().optional(),
          category_key: z
            .lazy(() => SettingCategoryKeyCompoundUniqueInputSchema)
            .optional(),
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
        .strict(),
    );

export default SettingWhereUniqueInputSchema;
