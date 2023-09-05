import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { MediaOrderByWithRelationInputSchema } from "./MediaOrderByWithRelationInputSchema";
import { RundownOrderByWithRelationInputSchema } from "./RundownOrderByWithRelationInputSchema";
import { LoadAssetJobOrderByRelationAggregateInputSchema } from "./LoadAssetJobOrderByRelationAggregateInputSchema";

export const AssetOrderByWithRelationInputSchema: z.ZodType<Prisma.AssetOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      rundownId: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional(),
      loadJobs: z
        .lazy(() => LoadAssetJobOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export default AssetOrderByWithRelationInputSchema;
