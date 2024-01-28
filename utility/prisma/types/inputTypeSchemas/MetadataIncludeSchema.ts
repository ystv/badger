import { z } from "zod";
import type { Prisma } from "../../client";
import { MetadataFieldArgsSchema } from "../outputTypeSchemas/MetadataFieldArgsSchema";
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema";
import { RundownArgsSchema } from "../outputTypeSchemas/RundownArgsSchema";

export const MetadataIncludeSchema: z.ZodType<Prisma.MetadataInclude> = z
  .object({
    field: z
      .union([z.boolean(), z.lazy(() => MetadataFieldArgsSchema)])
      .optional(),
    show: z.union([z.boolean(), z.lazy(() => ShowArgsSchema)]).optional(),
    rundown: z.union([z.boolean(), z.lazy(() => RundownArgsSchema)]).optional(),
  })
  .strict();

export default MetadataIncludeSchema;
