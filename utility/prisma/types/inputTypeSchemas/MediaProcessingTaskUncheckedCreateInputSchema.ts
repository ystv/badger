import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskUncheckedCreateInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  media_id: z.number().int(),
  description: z.string(),
  additionalInfo: z.string().optional(),
  state: z.lazy(() => MediaProcessingTaskStateSchema).optional()
}).strict();

export default MediaProcessingTaskUncheckedCreateInputSchema;
