import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const BaseJobRelationFilterSchema: z.ZodType<Prisma.BaseJobRelationFilter> =
  z
    .object({
      is: z.lazy(() => BaseJobWhereInputSchema).optional(),
      isNot: z.lazy(() => BaseJobWhereInputSchema).optional(),
    })
    .strict();

export default BaseJobRelationFilterSchema;
