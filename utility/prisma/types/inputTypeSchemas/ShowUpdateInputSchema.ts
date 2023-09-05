import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { RundownUpdateManyWithoutShowNestedInputSchema } from "./RundownUpdateManyWithoutShowNestedInputSchema";
import { ContinuityItemUpdateManyWithoutShowNestedInputSchema } from "./ContinuityItemUpdateManyWithoutShowNestedInputSchema";

export const ShowUpdateInputSchema: z.ZodType<Prisma.ShowUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
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
    rundowns: z
      .lazy(() => RundownUpdateManyWithoutShowNestedInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemUpdateManyWithoutShowNestedInputSchema)
      .optional(),
  })
  .strict();

export default ShowUpdateInputSchema;
