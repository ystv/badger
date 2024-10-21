import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"

export const ContinuityItemIncludeSchema: z.ZodType<Prisma.ContinuityItemInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export default ContinuityItemIncludeSchema;
