import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { SettingKeySchema } from "./SettingKeySchema";
import { EnumSettingKeyFieldUpdateOperationsInputSchema } from "./EnumSettingKeyFieldUpdateOperationsInputSchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const SettingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
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

export default SettingUncheckedUpdateManyInputSchema;
