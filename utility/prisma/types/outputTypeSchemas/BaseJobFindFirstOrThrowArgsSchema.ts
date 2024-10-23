import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereInputSchema } from '../inputTypeSchemas/BaseJobWhereInputSchema'
import { BaseJobOrderByWithRelationInputSchema } from '../inputTypeSchemas/BaseJobOrderByWithRelationInputSchema'
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'
import { BaseJobScalarFieldEnumSchema } from '../inputTypeSchemas/BaseJobScalarFieldEnumSchema'

export const BaseJobFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.BaseJobFindFirstOrThrowArgs, "select">> = z.object({
  where: BaseJobWhereInputSchema.optional(),
  orderBy: z.union([ BaseJobOrderByWithRelationInputSchema.array(),BaseJobOrderByWithRelationInputSchema ]).optional(),
  cursor: BaseJobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BaseJobScalarFieldEnumSchema,BaseJobScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default BaseJobFindFirstOrThrowArgsSchema;
