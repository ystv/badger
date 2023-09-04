import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateWithoutMediaInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
      loadJobs: z
        .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
        .optional(),
    })
    .strict();

export default AssetCreateWithoutMediaInputSchema;
