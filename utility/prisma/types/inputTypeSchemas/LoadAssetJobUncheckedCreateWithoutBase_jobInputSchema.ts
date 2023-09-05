import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUncheckedCreateWithoutBase_jobInput> =
  z
    .object({
      id: z.number().int().optional(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      asset_id: z.number().int(),
    })
    .strict();

export default LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema;
