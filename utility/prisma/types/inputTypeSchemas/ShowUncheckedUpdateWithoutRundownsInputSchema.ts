import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";
import { ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema } from "./ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema";

export const ShowUncheckedUpdateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutRundownsInput> =
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
      start: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default ShowUncheckedUpdateWithoutRundownsInputSchema;
