import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaUncheckedCreateNestedOneWithoutContinuityItemInputSchema } from "./MediaUncheckedCreateNestedOneWithoutContinuityItemInputSchema";

export const ContinuityItemUncheckedCreateInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
      showId: z.number().int(),
      durationSeconds: z.number().int(),
      media: z
        .lazy(
          () => MediaUncheckedCreateNestedOneWithoutContinuityItemInputSchema,
        )
        .optional(),
    })
    .strict();

export default ContinuityItemUncheckedCreateInputSchema;
