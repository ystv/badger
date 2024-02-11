import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { NullableIntFieldUpdateOperationsInputSchema } from "./NullableIntFieldUpdateOperationsInputSchema";

export const MetadataUncheckedUpdateManyWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutFieldInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue])
        .optional(),
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      rundownId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export default MetadataUncheckedUpdateManyWithoutFieldInputSchema;
