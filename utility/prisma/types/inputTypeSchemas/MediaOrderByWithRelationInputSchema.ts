import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { RundownItemOrderByWithRelationInputSchema } from "./RundownItemOrderByWithRelationInputSchema";
import { ContinuityItemOrderByWithRelationInputSchema } from "./ContinuityItemOrderByWithRelationInputSchema";
import { MediaProcessingTaskOrderByRelationAggregateInputSchema } from "./MediaProcessingTaskOrderByRelationAggregateInputSchema";
import { ProcessMediaJobOrderByRelationAggregateInputSchema } from "./ProcessMediaJobOrderByRelationAggregateInputSchema";
import { AssetOrderByWithRelationInputSchema } from "./AssetOrderByWithRelationInputSchema";

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      rawPath: z.lazy(() => SortOrderSchema).optional(),
      path: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      rundownItemID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      continuityItemID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      rundownItem: z
        .lazy(() => RundownItemOrderByWithRelationInputSchema)
        .optional(),
      continuityItem: z
        .lazy(() => ContinuityItemOrderByWithRelationInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskOrderByRelationAggregateInputSchema)
        .optional(),
      process_jobs: z
        .lazy(() => ProcessMediaJobOrderByRelationAggregateInputSchema)
        .optional(),
      asset: z.lazy(() => AssetOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export default MediaOrderByWithRelationInputSchema;
