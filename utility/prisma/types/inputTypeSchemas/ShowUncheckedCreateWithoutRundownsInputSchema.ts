import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema } from "./ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema";

export const ShowUncheckedCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutRundownsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
    })
    .strict();

export default ShowUncheckedCreateWithoutRundownsInputSchema;
