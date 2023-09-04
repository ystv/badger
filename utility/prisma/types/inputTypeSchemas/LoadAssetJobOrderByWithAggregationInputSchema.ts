import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { LoadAssetJobCountOrderByAggregateInputSchema } from "./LoadAssetJobCountOrderByAggregateInputSchema";
import { LoadAssetJobAvgOrderByAggregateInputSchema } from "./LoadAssetJobAvgOrderByAggregateInputSchema";
import { LoadAssetJobMaxOrderByAggregateInputSchema } from "./LoadAssetJobMaxOrderByAggregateInputSchema";
import { LoadAssetJobMinOrderByAggregateInputSchema } from "./LoadAssetJobMinOrderByAggregateInputSchema";
import { LoadAssetJobSumOrderByAggregateInputSchema } from "./LoadAssetJobSumOrderByAggregateInputSchema";

export const LoadAssetJobOrderByWithAggregationInputSchema: z.ZodType<Prisma.LoadAssetJobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sourceType: z.lazy(() => SortOrderSchema).optional(),
      source: z.lazy(() => SortOrderSchema).optional(),
      asset_id: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => LoadAssetJobCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => LoadAssetJobAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => LoadAssetJobMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => LoadAssetJobMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => LoadAssetJobSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export default LoadAssetJobOrderByWithAggregationInputSchema;
