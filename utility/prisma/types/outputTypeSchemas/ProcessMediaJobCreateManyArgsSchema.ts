import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobCreateManyInputSchema } from "../inputTypeSchemas/ProcessMediaJobCreateManyInputSchema";

export const ProcessMediaJobCreateManyArgsSchema: z.ZodType<Prisma.ProcessMediaJobCreateManyArgs> =
  z
    .object({
      data: z.union([
        ProcessMediaJobCreateManyInputSchema,
        ProcessMediaJobCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default ProcessMediaJobCreateManyArgsSchema;
