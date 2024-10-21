import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereInputSchema } from '../inputTypeSchemas/MediaWhereInputSchema'
import { MediaOrderByWithRelationInputSchema } from '../inputTypeSchemas/MediaOrderByWithRelationInputSchema'
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'
import { MediaScalarFieldEnumSchema } from '../inputTypeSchemas/MediaScalarFieldEnumSchema'

export const MediaFindFirstArgsSchema: z.ZodType<Omit<Prisma.MediaFindFirstArgs, "select" | "include">> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default MediaFindFirstArgsSchema;
