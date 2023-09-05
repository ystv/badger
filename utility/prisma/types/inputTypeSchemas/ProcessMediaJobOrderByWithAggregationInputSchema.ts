import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { ProcessMediaJobCountOrderByAggregateInputSchema } from "./ProcessMediaJobCountOrderByAggregateInputSchema";
import { ProcessMediaJobAvgOrderByAggregateInputSchema } from "./ProcessMediaJobAvgOrderByAggregateInputSchema";
import { ProcessMediaJobMaxOrderByAggregateInputSchema } from "./ProcessMediaJobMaxOrderByAggregateInputSchema";
import { ProcessMediaJobMinOrderByAggregateInputSchema } from "./ProcessMediaJobMinOrderByAggregateInputSchema";
import { ProcessMediaJobSumOrderByAggregateInputSchema } from "./ProcessMediaJobSumOrderByAggregateInputSchema";

export const ProcessMediaJobOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProcessMediaJobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      sourceType: z.lazy(() => SortOrderSchema).optional(),
      source: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => ProcessMediaJobCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ProcessMediaJobAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ProcessMediaJobMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ProcessMediaJobMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ProcessMediaJobSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export default ProcessMediaJobOrderByWithAggregationInputSchema;
