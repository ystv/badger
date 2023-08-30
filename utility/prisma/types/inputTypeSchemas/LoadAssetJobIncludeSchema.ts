import { z } from "zod";
import type { Prisma } from "../../client";
import { AssetArgsSchema } from "../outputTypeSchemas/AssetArgsSchema";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const LoadAssetJobIncludeSchema: z.ZodType<Prisma.LoadAssetJobInclude> =
  z
    .object({
      asset: z.union([z.boolean(), z.lazy(() => AssetArgsSchema)]).optional(),
      base_job: z
        .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
        .optional(),
    })
    .strict();

export default LoadAssetJobIncludeSchema;
