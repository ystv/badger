import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema";

export const AssetUncheckedCreateInputSchema: z.ZodType<Prisma.AssetUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
      mediaId: z.number().int(),
      loadJobs: z
        .lazy(
          () => LoadAssetJobUncheckedCreateNestedManyWithoutAssetInputSchema,
        )
        .optional(),
    })
    .strict();

export default AssetUncheckedCreateInputSchema;
