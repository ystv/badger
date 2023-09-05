import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { ShowOrderByWithRelationInputSchema } from "./ShowOrderByWithRelationInputSchema";
import { RundownItemOrderByRelationAggregateInputSchema } from "./RundownItemOrderByRelationAggregateInputSchema";
import { AssetOrderByRelationAggregateInputSchema } from "./AssetOrderByRelationAggregateInputSchema";

export const RundownOrderByWithRelationInputSchema: z.ZodType<Prisma.RundownOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
      items: z
        .lazy(() => RundownItemOrderByRelationAggregateInputSchema)
        .optional(),
      assets: z.lazy(() => AssetOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export default RundownOrderByWithRelationInputSchema;
