import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { ProcessMediaJobOrderByWithRelationInputSchema } from "./ProcessMediaJobOrderByWithRelationInputSchema";
import { LoadAssetJobOrderByWithRelationInputSchema } from "./LoadAssetJobOrderByWithRelationInputSchema";
import { DummyTestJobOrderByRelationAggregateInputSchema } from "./DummyTestJobOrderByRelationAggregateInputSchema";

export const BaseJobOrderByWithRelationInputSchema: z.ZodType<Prisma.BaseJobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      workerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobProvider: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      externalJobID: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      ProcessMediaJob: z
        .lazy(() => ProcessMediaJobOrderByWithRelationInputSchema)
        .optional(),
      LoadAssetJob: z
        .lazy(() => LoadAssetJobOrderByWithRelationInputSchema)
        .optional(),
      DummyTestJob: z
        .lazy(() => DummyTestJobOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export default BaseJobOrderByWithRelationInputSchema;
