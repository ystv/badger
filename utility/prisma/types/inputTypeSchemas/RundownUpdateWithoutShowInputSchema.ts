import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { RundownItemUpdateManyWithoutRundownNestedInputSchema } from "./RundownItemUpdateManyWithoutRundownNestedInputSchema";
import { AssetUpdateManyWithoutRundownNestedInputSchema } from "./AssetUpdateManyWithoutRundownNestedInputSchema";

export const RundownUpdateWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateWithoutShowInput> =
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
      items: z
        .lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema)
        .optional(),
    })
    .strict();

export default RundownUpdateWithoutShowInputSchema;
