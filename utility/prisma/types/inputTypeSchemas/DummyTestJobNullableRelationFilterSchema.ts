import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";

export const DummyTestJobNullableRelationFilterSchema: z.ZodType<Prisma.DummyTestJobNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => DummyTestJobWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => DummyTestJobWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default DummyTestJobNullableRelationFilterSchema;
