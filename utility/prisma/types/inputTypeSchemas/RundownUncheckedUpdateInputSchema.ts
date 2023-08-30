import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema } from "./RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema";
import { AssetUncheckedUpdateManyWithoutRundownNestedInputSchema } from "./AssetUncheckedUpdateManyWithoutRundownNestedInputSchema";

export const RundownUncheckedUpdateInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateInput> =
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
      showId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      order: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      items: z
        .lazy(
          () => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export default RundownUncheckedUpdateInputSchema;
