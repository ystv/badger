import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskCreateManyMediaInputSchema } from './MediaProcessingTaskCreateManyMediaInputSchema';

export const MediaProcessingTaskCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyMediaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MediaProcessingTaskCreateManyMediaInputSchema),z.lazy(() => MediaProcessingTaskCreateManyMediaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MediaProcessingTaskCreateManyMediaInputEnvelopeSchema;
