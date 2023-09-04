import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const LoadAssetJobUncheckedCreateInputSchema: z.ZodType<Prisma.LoadAssetJobUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      asset_id: z.number().int(),
      base_job_id: z.number().int(),
    })
    .strict();

export default LoadAssetJobUncheckedCreateInputSchema;
