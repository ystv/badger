import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const ProcessMediaJobOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProcessMediaJobOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default ProcessMediaJobOrderByRelationAggregateInputSchema;
