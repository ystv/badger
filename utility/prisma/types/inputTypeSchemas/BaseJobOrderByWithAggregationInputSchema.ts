import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { BaseJobCountOrderByAggregateInputSchema } from "./BaseJobCountOrderByAggregateInputSchema";
import { BaseJobAvgOrderByAggregateInputSchema } from "./BaseJobAvgOrderByAggregateInputSchema";
import { BaseJobMaxOrderByAggregateInputSchema } from "./BaseJobMaxOrderByAggregateInputSchema";
import { BaseJobMinOrderByAggregateInputSchema } from "./BaseJobMinOrderByAggregateInputSchema";
import { BaseJobSumOrderByAggregateInputSchema } from "./BaseJobSumOrderByAggregateInputSchema";

export const BaseJobOrderByWithAggregationInputSchema: z.ZodType<Prisma.BaseJobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobProvider: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => BaseJobCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => BaseJobAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => BaseJobMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => BaseJobMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => BaseJobSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export default BaseJobOrderByWithAggregationInputSchema;
