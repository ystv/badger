import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskWhereInputSchema } from './MediaProcessingTaskWhereInputSchema';

export const MediaProcessingTaskListRelationFilterSchema: z.ZodType<Prisma.MediaProcessingTaskListRelationFilter> = z.object({
  every: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional(),
  some: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional(),
  none: z.lazy(() => MediaProcessingTaskWhereInputSchema).optional()
}).strict();

export default MediaProcessingTaskListRelationFilterSchema;
