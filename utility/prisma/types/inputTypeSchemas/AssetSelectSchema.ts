import { z } from "zod";
import type { Prisma } from "../../client";
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema";
import { RundownArgsSchema } from "../outputTypeSchemas/RundownArgsSchema";
import { LoadAssetJobFindManyArgsSchema } from "../outputTypeSchemas/LoadAssetJobFindManyArgsSchema";
import { AssetCountOutputTypeArgsSchema } from "../outputTypeSchemas/AssetCountOutputTypeArgsSchema";

export const AssetSelectSchema: z.ZodType<Prisma.AssetSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    type: z.boolean().optional(),
    rundownId: z.boolean().optional(),
    mediaId: z.boolean().optional(),
    media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
    loadJobs: z
      .union([z.boolean(), z.lazy(() => LoadAssetJobFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AssetCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default AssetSelectSchema;
