import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskCreateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskCreateInputSchema'
import { MediaProcessingTaskUncheckedCreateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUncheckedCreateInputSchema'

export const MediaProcessingTaskCreateArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskCreateArgs, "select" | "include">> = z.object({
  data: z.union([ MediaProcessingTaskCreateInputSchema,MediaProcessingTaskUncheckedCreateInputSchema ]),
}).strict() ;

export default MediaProcessingTaskCreateArgsSchema;
