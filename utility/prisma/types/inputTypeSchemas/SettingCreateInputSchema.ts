import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingKeySchema } from "./SettingKeySchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z
  .object({
    key: z.lazy(() => SettingKeySchema),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  })
  .strict();

export default SettingCreateInputSchema;
