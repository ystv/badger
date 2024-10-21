import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"
import { RundownArgsSchema } from "../outputTypeSchemas/RundownArgsSchema"

export const RundownItemIncludeSchema: z.ZodType<Prisma.RundownItemInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  rundown: z.union([z.boolean(),z.lazy(() => RundownArgsSchema)]).optional(),
}).strict()

export default RundownItemIncludeSchema;
