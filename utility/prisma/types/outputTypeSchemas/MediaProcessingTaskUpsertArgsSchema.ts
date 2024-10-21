import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'
import { MediaProcessingTaskCreateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskCreateInputSchema'
import { MediaProcessingTaskUncheckedCreateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUncheckedCreateInputSchema'
import { MediaProcessingTaskUpdateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUpdateInputSchema'
import { MediaProcessingTaskUncheckedUpdateInputSchema } from '../inputTypeSchemas/MediaProcessingTaskUncheckedUpdateInputSchema'

export const MediaProcessingTaskUpsertArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskUpsertArgs, "select" | "include">> = z.object({
  where: MediaProcessingTaskWhereUniqueInputSchema,
  create: z.union([ MediaProcessingTaskCreateInputSchema,MediaProcessingTaskUncheckedCreateInputSchema ]),
  update: z.union([ MediaProcessingTaskUpdateInputSchema,MediaProcessingTaskUncheckedUpdateInputSchema ]),
}).strict() ;

export default MediaProcessingTaskUpsertArgsSchema;
