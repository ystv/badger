import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaFileSourceTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MediaFileSourceTypeSchema).optional(),
    })
    .strict();

export default EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema;
