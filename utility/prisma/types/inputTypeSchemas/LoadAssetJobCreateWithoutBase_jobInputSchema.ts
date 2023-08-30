import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { AssetCreateNestedOneWithoutLoadJobsInputSchema } from "./AssetCreateNestedOneWithoutLoadJobsInputSchema";

export const LoadAssetJobCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobCreateWithoutBase_jobInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      asset: z.lazy(() => AssetCreateNestedOneWithoutLoadJobsInputSchema),
    })
    .strict();

export default LoadAssetJobCreateWithoutBase_jobInputSchema;
