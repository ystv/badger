import type { Prisma } from '../../client';

import { z } from 'zod';

export const MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema: z.ZodType<Prisma.MediaProcessingTaskMedia_idDescriptionCompoundUniqueInput> = z.object({
  media_id: z.number(),
  description: z.string()
}).strict();

export default MediaProcessingTaskMedia_idDescriptionCompoundUniqueInputSchema;
