import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const AssetMinOrderByAggregateInputSchema: z.ZodType<Prisma.AssetMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default AssetMinOrderByAggregateInputSchema;
