import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from "./RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema";
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from "./AssetUncheckedCreateNestedManyWithoutRundownInputSchema";

export const RundownUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export default RundownUncheckedCreateWithoutShowInputSchema;
