import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from "./RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema";

export const RundownUncheckedCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutAssetsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      showId: z.number().int(),
      order: z.number().int(),
      items: z
        .lazy(
          () => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema,
        )
        .optional(),
    })
    .strict();

export default RundownUncheckedCreateWithoutAssetsInputSchema;
