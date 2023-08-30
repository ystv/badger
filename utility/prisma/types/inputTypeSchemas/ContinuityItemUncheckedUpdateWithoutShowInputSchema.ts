import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { MediaUncheckedUpdateOneWithoutContinuityItemNestedInputSchema } from "./MediaUncheckedUpdateOneWithoutContinuityItemNestedInputSchema";

export const ContinuityItemUncheckedUpdateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateWithoutShowInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media: z
        .lazy(
          () => MediaUncheckedUpdateOneWithoutContinuityItemNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default ContinuityItemUncheckedUpdateWithoutShowInputSchema;
