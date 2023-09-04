import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";

export const AssetCreateManyRundownInputSchema: z.ZodType<Prisma.AssetCreateManyRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      type: z.lazy(() => AssetTypeSchema),
      mediaId: z.number().int(),
    })
    .strict();

export default AssetCreateManyRundownInputSchema;
