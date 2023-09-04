import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const LoadAssetJobSumOrderByAggregateInputSchema: z.ZodType<Prisma.LoadAssetJobSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      asset_id: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default LoadAssetJobSumOrderByAggregateInputSchema;
