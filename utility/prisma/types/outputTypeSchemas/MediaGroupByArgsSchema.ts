import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereInputSchema } from '../inputTypeSchemas/MediaWhereInputSchema'
import { MediaOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MediaOrderByWithAggregationInputSchema'
import { MediaScalarFieldEnumSchema } from '../inputTypeSchemas/MediaScalarFieldEnumSchema'
import { MediaScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MediaScalarWhereWithAggregatesInputSchema'

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithAggregationInputSchema.array(),MediaOrderByWithAggregationInputSchema ]).optional(),
  by: MediaScalarFieldEnumSchema.array(),
  having: MediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MediaGroupByArgsSchema;
