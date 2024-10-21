import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskCreateManyMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyMediaInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  additionalInfo: z.string().optional(),
  state: z.lazy(() => MediaProcessingTaskStateSchema).optional()
}).strict();

export default MediaProcessingTaskCreateManyMediaInputSchema;
