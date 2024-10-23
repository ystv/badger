import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereInputSchema } from '../inputTypeSchemas/MediaWhereInputSchema'
import { MediaOrderByWithRelationInputSchema } from '../inputTypeSchemas/MediaOrderByWithRelationInputSchema'
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MediaAggregateArgsSchema;
