import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskSelectSchema } from '../inputTypeSchemas/MediaProcessingTaskSelectSchema';
import { MediaProcessingTaskIncludeSchema } from '../inputTypeSchemas/MediaProcessingTaskIncludeSchema';

export const MediaProcessingTaskArgsSchema: z.ZodType<Prisma.MediaProcessingTaskDefaultArgs> = z.object({
  select: z.lazy(() => MediaProcessingTaskSelectSchema).optional(),
  include: z.lazy(() => MediaProcessingTaskIncludeSchema).optional(),
}).strict();

export default MediaProcessingTaskArgsSchema;
