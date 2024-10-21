import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereInputSchema'
import { MediaProcessingTaskOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MediaProcessingTaskOrderByWithAggregationInputSchema'
import { MediaProcessingTaskScalarFieldEnumSchema } from '../inputTypeSchemas/MediaProcessingTaskScalarFieldEnumSchema'
import { MediaProcessingTaskScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MediaProcessingTaskScalarWhereWithAggregatesInputSchema'

export const MediaProcessingTaskGroupByArgsSchema: z.ZodType<Prisma.MediaProcessingTaskGroupByArgs> = z.object({
  where: MediaProcessingTaskWhereInputSchema.optional(),
  orderBy: z.union([ MediaProcessingTaskOrderByWithAggregationInputSchema.array(),MediaProcessingTaskOrderByWithAggregationInputSchema ]).optional(),
  by: MediaProcessingTaskScalarFieldEnumSchema.array(),
  having: MediaProcessingTaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MediaProcessingTaskGroupByArgsSchema;
