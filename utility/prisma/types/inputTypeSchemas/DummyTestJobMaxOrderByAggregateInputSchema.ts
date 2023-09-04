import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const DummyTestJobMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DummyTestJobMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      baseJobId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default DummyTestJobMaxOrderByAggregateInputSchema;
