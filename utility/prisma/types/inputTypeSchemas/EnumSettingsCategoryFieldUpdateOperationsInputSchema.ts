import type { Prisma } from "../../client";
import { z } from "zod";
import { SettingsCategorySchema } from "./SettingsCategorySchema";

export const EnumSettingsCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSettingsCategoryFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => SettingsCategorySchema).optional(),
    })
    .strict();

export default EnumSettingsCategoryFieldUpdateOperationsInputSchema;
