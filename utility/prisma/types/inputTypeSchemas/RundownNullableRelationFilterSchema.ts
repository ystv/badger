import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownWhereInputSchema } from "./RundownWhereInputSchema";

export const RundownNullableRelationFilterSchema: z.ZodType<Prisma.RundownNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => RundownWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => RundownWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default RundownNullableRelationFilterSchema;
