import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateNestedOneWithoutAssetsInputSchema } from "./MediaCreateNestedOneWithoutAssetsInputSchema";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateInputSchema: z.ZodType<Prisma.AssetCreateInput> = z
  .object({
    name: z.string(),
    category: z.string(),
    order: z.number().int(),
    media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema),
    rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
    loadJobs: z
      .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
      .optional(),
  })
  .strict();

export default AssetCreateInputSchema;
