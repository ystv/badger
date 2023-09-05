import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const LoadAssetJobCreateManyInputSchema: z.ZodType<Prisma.LoadAssetJobCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      asset_id: z.number().int(),
      base_job_id: z.number().int(),
    })
    .strict();

export default LoadAssetJobCreateManyInputSchema;
