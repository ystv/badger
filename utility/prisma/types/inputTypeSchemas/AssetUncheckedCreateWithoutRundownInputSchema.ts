import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema";

export const AssetUncheckedCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      mediaId: z.number().int(),
      loadJobs: z
        .lazy(
          () => LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema,
        )
        .optional(),
    })
    .strict();

export default AssetUncheckedCreateWithoutRundownInputSchema;
