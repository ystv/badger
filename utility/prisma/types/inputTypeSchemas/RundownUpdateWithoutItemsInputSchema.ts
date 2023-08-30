import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { ShowUpdateOneRequiredWithoutRundownsNestedInputSchema } from "./ShowUpdateOneRequiredWithoutRundownsNestedInputSchema";
import { AssetUpdateManyWithoutRundownNestedInputSchema } from "./AssetUpdateManyWithoutRundownNestedInputSchema";

export const RundownUpdateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpdateWithoutItemsInput> =
  z
    .object({
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
      show: z
        .lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export default RundownUpdateWithoutItemsInputSchema;
