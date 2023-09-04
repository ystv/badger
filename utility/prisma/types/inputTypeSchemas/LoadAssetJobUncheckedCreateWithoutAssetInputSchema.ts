import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const LoadAssetJobUncheckedCreateWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobUncheckedCreateWithoutAssetInput> =
  z
    .object({
      id: z.number().int().optional(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      base_job_id: z.number().int(),
    })
    .strict();

export default LoadAssetJobUncheckedCreateWithoutAssetInputSchema;
