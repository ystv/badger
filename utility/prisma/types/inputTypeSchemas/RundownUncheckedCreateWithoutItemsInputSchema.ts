import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from "./AssetUncheckedCreateNestedManyWithoutRundownInputSchema";

export const RundownUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export default RundownUncheckedCreateWithoutItemsInputSchema;
