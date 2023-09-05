import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const DummyTestJobCountOrderByAggregateInputSchema: z.ZodType<Prisma.DummyTestJobCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      baseJobId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default DummyTestJobCountOrderByAggregateInputSchema;
