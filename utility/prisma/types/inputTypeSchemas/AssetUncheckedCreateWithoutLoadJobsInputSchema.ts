import type { Prisma } from "../../client";
import { z } from "zod";

export const AssetUncheckedCreateWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutLoadJobsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z.string(),
      order: z.number().int(),
      rundownId: z.number().int(),
      mediaId: z.number().int(),
    })
    .strict();

export default AssetUncheckedCreateWithoutLoadJobsInputSchema;
