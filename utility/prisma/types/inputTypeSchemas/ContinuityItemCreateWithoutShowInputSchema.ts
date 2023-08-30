import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateNestedOneWithoutContinuityItemInputSchema } from "./MediaCreateNestedOneWithoutContinuityItemInputSchema";

export const ContinuityItemCreateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateWithoutShowInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutContinuityItemInputSchema)
        .optional(),
    })
    .strict();

export default ContinuityItemCreateWithoutShowInputSchema;
