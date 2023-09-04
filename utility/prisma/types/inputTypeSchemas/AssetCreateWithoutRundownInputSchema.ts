import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { MediaCreateNestedOneWithoutAssetInputSchema } from "./MediaCreateNestedOneWithoutAssetInputSchema";
import { LoadAssetJobCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobCreateNestedManyWithoutAssetInputSchema";

export const AssetCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateWithoutRundownInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      media: z.lazy(() => MediaCreateNestedOneWithoutAssetInputSchema),
      loadJobs: z
        .lazy(() => LoadAssetJobCreateNestedManyWithoutAssetInputSchema)
        .optional(),
    })
    .strict();

export default AssetCreateWithoutRundownInputSchema;
