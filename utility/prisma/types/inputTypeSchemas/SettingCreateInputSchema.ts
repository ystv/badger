import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z
  .object({
    category: z.lazy(() => SettingsCategorySchema),
    key: z.lazy(() => SettingKeySchema),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  })
  .strict();

export default SettingCreateInputSchema;
