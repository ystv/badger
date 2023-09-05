import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { DummyTestJobCountOrderByAggregateInputSchema } from "./DummyTestJobCountOrderByAggregateInputSchema";
import { DummyTestJobAvgOrderByAggregateInputSchema } from "./DummyTestJobAvgOrderByAggregateInputSchema";
import { DummyTestJobMaxOrderByAggregateInputSchema } from "./DummyTestJobMaxOrderByAggregateInputSchema";
import { DummyTestJobMinOrderByAggregateInputSchema } from "./DummyTestJobMinOrderByAggregateInputSchema";
import { DummyTestJobSumOrderByAggregateInputSchema } from "./DummyTestJobSumOrderByAggregateInputSchema";

export const DummyTestJobOrderByWithAggregationInputSchema: z.ZodType<Prisma.DummyTestJobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      baseJobId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => DummyTestJobCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => DummyTestJobAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => DummyTestJobMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => DummyTestJobMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => DummyTestJobSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export default DummyTestJobOrderByWithAggregationInputSchema;
