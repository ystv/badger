import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobCreateManyInputSchema } from "../inputTypeSchemas/DummyTestJobCreateManyInputSchema";

export const DummyTestJobCreateManyArgsSchema: z.ZodType<Prisma.DummyTestJobCreateManyArgs> =
  z
    .object({
      data: z.union([
        DummyTestJobCreateManyInputSchema,
        DummyTestJobCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default DummyTestJobCreateManyArgsSchema;
