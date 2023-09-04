import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";

export const ContinuityItemNullableRelationFilterSchema: z.ZodType<Prisma.ContinuityItemNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => ContinuityItemWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ContinuityItemWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default ContinuityItemNullableRelationFilterSchema;
