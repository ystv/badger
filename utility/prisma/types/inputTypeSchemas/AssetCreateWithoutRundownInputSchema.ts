import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateNestedOneWithoutAssetsInputSchema } from "./MediaCreateNestedOneWithoutAssetsInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateWithoutRundownInput> =
  z
    .object({
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema),
      loadJobs: z
        .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
        .optional(),
    })
    .strict();

export default AssetCreateWithoutRundownInputSchema;
