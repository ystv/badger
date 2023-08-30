import { z } from "zod";
import type { Prisma } from "../../client";
import { AssetArgsSchema } from "../outputTypeSchemas/AssetArgsSchema";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const LoadAssetJobSelectSchema: z.ZodType<Prisma.LoadAssetJobSelect> = z
  .object({
    id: z.boolean().optional(),
    sourceType: z.boolean().optional(),
    source: z.boolean().optional(),
    asset_id: z.boolean().optional(),
    base_job_id: z.boolean().optional(),
    asset: z.union([z.boolean(), z.lazy(() => AssetArgsSchema)]).optional(),
    base_job: z
      .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
      .optional(),
  })
  .strict();

export default LoadAssetJobSelectSchema;
