import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const ProcessMediaJobSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProcessMediaJobSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default ProcessMediaJobSumOrderByAggregateInputSchema;
