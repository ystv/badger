import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { MediaCreateNestedOneWithoutAssetInputSchema } from "./MediaCreateNestedOneWithoutAssetInputSchema";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";

export const AssetCreateWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetCreateWithoutLoadJobsInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      media: z.lazy(() => MediaCreateNestedOneWithoutAssetInputSchema),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
    })
    .strict();

export default AssetCreateWithoutLoadJobsInputSchema;
