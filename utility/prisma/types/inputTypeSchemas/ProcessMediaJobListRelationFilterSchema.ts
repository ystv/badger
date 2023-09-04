import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";

export const ProcessMediaJobListRelationFilterSchema: z.ZodType<Prisma.ProcessMediaJobListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ProcessMediaJobWhereInputSchema).optional(),
      some: z.lazy(() => ProcessMediaJobWhereInputSchema).optional(),
      none: z.lazy(() => ProcessMediaJobWhereInputSchema).optional(),
    })
    .strict();

export default ProcessMediaJobListRelationFilterSchema;
