import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";

export const ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sourceType: z
        .union([
          z.lazy(() => MediaFileSourceTypeSchema),
          z.lazy(() => EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      source: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      base_job_id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema;
