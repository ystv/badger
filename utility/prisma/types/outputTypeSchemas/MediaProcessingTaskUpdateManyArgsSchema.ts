import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskUpdateManyMutationInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUpdateManyMutationInputSchema'
import { MediaProcessingTaskUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUncheckedUpdateManyInputSchema'
import { MediaProcessingTaskWhereInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereInputSchema'

export const MediaProcessingTaskUpdateManyArgsSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyArgs> = z.object({
  data: z.union([ MediaProcessingTaskUpdateManyMutationInputSchema,MediaProcessingTaskUncheckedUpdateManyInputSchema ]),
  where: MediaProcessingTaskWhereInputSchema.optional(),
}).strict() ;

export default MediaProcessingTaskUpdateManyArgsSchema;
