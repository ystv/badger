import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const DummyTestJobMinOrderByAggregateInputSchema: z.ZodType<Prisma.DummyTestJobMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      baseJobId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default DummyTestJobMinOrderByAggregateInputSchema;
