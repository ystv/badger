import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskCreateWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateWithoutMediaInput> = z.object({
  description: z.string(),
  additionalInfo: z.string().optional(),
  state: z.lazy(() => MediaProcessingTaskStateSchema).optional()
}).strict();

export default MediaProcessingTaskCreateWithoutMediaInputSchema;
