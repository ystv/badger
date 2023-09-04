import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { AssetOrderByWithRelationInputSchema } from "./AssetOrderByWithRelationInputSchema";
import { BaseJobOrderByWithRelationInputSchema } from "./BaseJobOrderByWithRelationInputSchema";

export const LoadAssetJobOrderByWithRelationInputSchema: z.ZodType<Prisma.LoadAssetJobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sourceType: z.lazy(() => SortOrderSchema).optional(),
      source: z.lazy(() => SortOrderSchema).optional(),
      asset_id: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
      asset: z.lazy(() => AssetOrderByWithRelationInputSchema).optional(),
      base_job: z.lazy(() => BaseJobOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export default LoadAssetJobOrderByWithRelationInputSchema;
