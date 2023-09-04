import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { MediaCreateNestedOneWithoutAssetInputSchema } from "./MediaCreateNestedOneWithoutAssetInputSchema";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateInputSchema: z.ZodType<Prisma.AssetCreateInput> = z
  .object({
    name: z.string(),
    type: z.lazy(() => AssetTypeSchema),
    media: z.lazy(() => MediaCreateNestedOneWithoutAssetInputSchema),
    rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
    loadJobs: z
      .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
      .optional(),
  })
  .strict();

export default AssetCreateInputSchema;
