import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingKeySchema } from "./SettingKeySchema";
import { EnumSettingKeyFieldUpdateOperationsInputSchema } from "./EnumSettingKeyFieldUpdateOperationsInputSchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const SettingUpdateInputSchema: z.ZodType<Prisma.SettingUpdateInput> = z
  .object({
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

export default SettingUpdateInputSchema;
