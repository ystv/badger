import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownCreateNestedManyWithoutShowInputSchema } from "./RundownCreateNestedManyWithoutShowInputSchema";

export const ShowCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateWithoutContinuityItemsInput> =
  z
    .object({
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      rundowns: z
        .lazy(() => RundownCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export default ShowCreateWithoutContinuityItemsInputSchema;
