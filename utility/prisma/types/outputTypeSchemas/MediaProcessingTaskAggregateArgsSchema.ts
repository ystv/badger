import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereInputSchema'
import { MediaProcessingTaskOrderByWithRelationInputSchema } from '../inputTypeSchemas/MediaProcessingTaskOrderByWithRelationInputSchema'
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'

export const MediaProcessingTaskAggregateArgsSchema: z.ZodType<Prisma.MediaProcessingTaskAggregateArgs> = z.object({
  where: MediaProcessingTaskWhereInputSchema.optional(),
  orderBy: z.union([ MediaProcessingTaskOrderByWithRelationInputSchema.array(),MediaProcessingTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaProcessingTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MediaProcessingTaskAggregateArgsSchema;
