import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateNestedOneWithoutContinuityItemInputSchema } from "./MediaCreateNestedOneWithoutContinuityItemInputSchema";
import { ShowCreateNestedOneWithoutContinuityItemsInputSchema } from "./ShowCreateNestedOneWithoutContinuityItemsInputSchema";

export const ContinuityItemCreateInputSchema: z.ZodType<Prisma.ContinuityItemCreateInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutContinuityItemInputSchema)
        .optional(),
      show: z.lazy(() => ShowCreateNestedOneWithoutContinuityItemsInputSchema),
    })
    .strict();

export default ContinuityItemCreateInputSchema;
