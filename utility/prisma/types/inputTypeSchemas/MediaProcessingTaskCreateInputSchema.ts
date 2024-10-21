import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';
import { MediaCreateNestedOneWithoutTasksInputSchema } from './MediaCreateNestedOneWithoutTasksInputSchema';

export const MediaProcessingTaskCreateInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateInput> = z.object({
  description: z.string(),
  additionalInfo: z.string().optional(),
  state: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutTasksInputSchema)
}).strict();

export default MediaProcessingTaskCreateInputSchema;
