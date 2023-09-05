import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemCreateNestedManyWithoutShowInputSchema } from "./ContinuityItemCreateNestedManyWithoutShowInputSchema";

export const ShowCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateWithoutRundownsInput> =
  z
    .object({
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      continuityItems: z
        .lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export default ShowCreateWithoutRundownsInputSchema;
