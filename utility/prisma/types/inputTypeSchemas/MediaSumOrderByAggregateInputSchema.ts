import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const MediaSumOrderByAggregateInputSchema: z.ZodType<Prisma.MediaSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      rundownItemID: z.lazy(() => SortOrderSchema).optional(),
      continuityItemID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default MediaSumOrderByAggregateInputSchema;
