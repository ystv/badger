import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { AssetCreateNestedOneWithoutLoadJobsInputSchema } from "./AssetCreateNestedOneWithoutLoadJobsInputSchema";
import { BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema } from "./BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema";

export const LoadAssetJobCreateInputSchema: z.ZodType<Prisma.LoadAssetJobCreateInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      asset: z.lazy(() => AssetCreateNestedOneWithoutLoadJobsInputSchema),
      base_job: z.lazy(
        () => BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema,
      ),
    })
    .strict();

export default LoadAssetJobCreateInputSchema;
