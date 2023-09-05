import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { RundownOrderByRelationAggregateInputSchema } from "./RundownOrderByRelationAggregateInputSchema";
import { ContinuityItemOrderByRelationAggregateInputSchema } from "./ContinuityItemOrderByRelationAggregateInputSchema";

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      rundowns: z
        .lazy(() => RundownOrderByRelationAggregateInputSchema)
        .optional(),
      continuityItems: z
        .lazy(() => ContinuityItemOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export default ShowOrderByWithRelationInputSchema;
