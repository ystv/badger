import { z } from "zod";
import type { Prisma } from "../../client";

export const AssetCountOutputTypeSelectSchema: z.ZodType<Prisma.AssetCountOutputTypeSelect> =
  z
    .object({
      loadJobs: z.boolean().optional(),
    })
    .strict();

export default AssetCountOutputTypeSelectSchema;
