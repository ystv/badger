import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskCreateManyInputSchema } from '../inputTypeSchemas/MediaProcessingTaskCreateManyInputSchema'

export const MediaProcessingTaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaProcessingTaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ MediaProcessingTaskCreateManyInputSchema,MediaProcessingTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MediaProcessingTaskCreateManyAndReturnArgsSchema;
