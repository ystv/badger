import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereInputSchema'
import { ShowWithDurationOrderByWithRelationInputSchema } from '../inputTypeSchemas/ShowWithDurationOrderByWithRelationInputSchema'
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'
import { ShowWithDurationScalarFieldEnumSchema } from '../inputTypeSchemas/ShowWithDurationScalarFieldEnumSchema'

export const ShowWithDurationFindFirstArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationFindFirstArgs, "select">> = z.object({
  where: ShowWithDurationWhereInputSchema.optional(),
  orderBy: z.union([ ShowWithDurationOrderByWithRelationInputSchema.array(),ShowWithDurationOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShowWithDurationScalarFieldEnumSchema,ShowWithDurationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ShowWithDurationFindFirstArgsSchema;
