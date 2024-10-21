import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"

export const MediaProcessingTaskIncludeSchema: z.ZodType<Prisma.MediaProcessingTaskInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
}).strict()

export default MediaProcessingTaskIncludeSchema;
