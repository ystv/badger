import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema } from "./BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema";

export const LoadAssetJobCreateWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobCreateWithoutAssetInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      base_job: z.lazy(
        () => BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema,
      ),
    })
    .strict();

export default LoadAssetJobCreateWithoutAssetInputSchema;
