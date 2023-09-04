import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";

export const ProcessMediaJobNullableRelationFilterSchema: z.ZodType<Prisma.ProcessMediaJobNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => ProcessMediaJobWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ProcessMediaJobWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default ProcessMediaJobNullableRelationFilterSchema;
