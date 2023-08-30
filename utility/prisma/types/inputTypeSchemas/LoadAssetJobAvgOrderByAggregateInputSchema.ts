import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const LoadAssetJobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LoadAssetJobAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      asset_id: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default LoadAssetJobAvgOrderByAggregateInputSchema;
