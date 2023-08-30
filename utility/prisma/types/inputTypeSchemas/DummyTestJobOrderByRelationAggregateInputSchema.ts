import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const DummyTestJobOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DummyTestJobOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default DummyTestJobOrderByRelationAggregateInputSchema;
