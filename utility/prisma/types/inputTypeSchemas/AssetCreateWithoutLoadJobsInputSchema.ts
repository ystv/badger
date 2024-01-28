import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { MediaCreateNestedOneWithoutAssetsInputSchema } from "./MediaCreateNestedOneWithoutAssetsInputSchema";
import { RundownCreateNestedOneWithoutAssetsInputSchema } from "./RundownCreateNestedOneWithoutAssetsInputSchema";

export const AssetCreateWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetCreateWithoutLoadJobsInput> =
  z
    .object({
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema),
      rundown: z.lazy(() => RundownCreateNestedOneWithoutAssetsInputSchema),
    })
    .strict();

export default AssetCreateWithoutLoadJobsInputSchema;
