import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateWithoutMediaInput> =
  z
    .object({
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
      loadJobs: z
        .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
        .optional(),
    })
    .strict();

export default AssetCreateWithoutMediaInputSchema;
