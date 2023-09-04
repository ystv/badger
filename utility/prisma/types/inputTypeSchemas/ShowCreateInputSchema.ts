import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownCreateNestedManyWithoutShowInputSchema } from "./RundownCreateNestedManyWithoutShowInputSchema";
import { ContinuityItemCreateNestedManyWithoutShowInputSchema } from "./ContinuityItemCreateNestedManyWithoutShowInputSchema";

export const ShowCreateInputSchema: z.ZodType<Prisma.ShowCreateInput> = z
  .object({
    name: z.string(),
    start: z.coerce.date(),
    version: z.number().int().optional(),
    rundowns: z
      .lazy(() => RundownCreateNestedManyWithoutShowInputSchema)
      .optional(),
    continuityItems: z
      .lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema)
      .optional(),
  })
  .strict();

export default ShowCreateInputSchema;
