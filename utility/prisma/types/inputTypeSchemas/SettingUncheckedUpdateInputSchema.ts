import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { SettingsCategorySchema } from "./SettingsCategorySchema";
import { EnumSettingsCategoryFieldUpdateOperationsInputSchema } from "./EnumSettingsCategoryFieldUpdateOperationsInputSchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { EnumSettingKeyFieldUpdateOperationsInputSchema } from "./EnumSettingKeyFieldUpdateOperationsInputSchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const SettingUncheckedUpdateInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => SettingsCategorySchema),
          z.lazy(() => EnumSettingsCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.lazy(() => SettingKeySchema),
          z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue])
        .optional(),
    })
    .strict();

export default SettingUncheckedUpdateInputSchema;
