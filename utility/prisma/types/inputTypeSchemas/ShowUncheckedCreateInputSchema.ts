import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownUncheckedCreateNestedManyWithoutShowInputSchema } from "./RundownUncheckedCreateNestedManyWithoutShowInputSchema";
import { ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema } from "./ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema";

export const ShowUncheckedCreateInputSchema: z.ZodType<Prisma.ShowUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      rundowns: z
        .lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
    })
    .strict();

export default ShowUncheckedCreateInputSchema;
