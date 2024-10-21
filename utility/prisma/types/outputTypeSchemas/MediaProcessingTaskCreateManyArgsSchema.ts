import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskCreateManyInputSchema } from '../inputTypeSchemas/MediaProcessingTaskCreateManyInputSchema'

export const MediaProcessingTaskCreateManyArgsSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyArgs> = z.object({
  data: z.union([ MediaProcessingTaskCreateManyInputSchema,MediaProcessingTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MediaProcessingTaskCreateManyArgsSchema;
