import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";

export const AssetCreateManyInputSchema: z.ZodType<Prisma.AssetCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      rundownId: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export default AssetCreateManyInputSchema;
