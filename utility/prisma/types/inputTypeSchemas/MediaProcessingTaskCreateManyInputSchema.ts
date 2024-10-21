import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskCreateManyInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyInput> = z.object({
  id: z.number().int().optional(),
  media_id: z.number().int(),
  description: z.string(),
  additionalInfo: z.string().optional(),
  state: z.lazy(() => MediaProcessingTaskStateSchema).optional()
}).strict();

export default MediaProcessingTaskCreateManyInputSchema;
