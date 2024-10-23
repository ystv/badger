import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskUpdateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUpdateInputSchema'
import { MediaProcessingTaskUncheckedUpdateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUncheckedUpdateInputSchema'
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'

export const MediaProcessingTaskUpdateArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ MediaProcessingTaskUpdateInputSchema,MediaProcessingTaskUncheckedUpdateInputSchema ]),
  where: MediaProcessingTaskWhereUniqueInputSchema,
}).strict() ;

export default MediaProcessingTaskUpdateArgsSchema;
