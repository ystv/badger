import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { SettingKeySchema } from "./SettingKeySchema";

export const SettingCategoryKeyCompoundUniqueInputSchema: z.ZodType<Prisma.SettingCategoryKeyCompoundUniqueInput> =
  z
    .object({
      category: z.lazy(() => SettingsCategorySchema),
      key: z.lazy(() => SettingKeySchema),
    })
    .strict();

export default SettingCategoryKeyCompoundUniqueInputSchema;
