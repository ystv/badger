import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";

export const RundownItemNullableRelationFilterSchema: z.ZodType<Prisma.RundownItemNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => RundownItemWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => RundownItemWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export default RundownItemNullableRelationFilterSchema;
