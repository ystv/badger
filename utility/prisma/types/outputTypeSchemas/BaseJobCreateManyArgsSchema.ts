import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobCreateManyInputSchema } from '../inputTypeSchemas/BaseJobCreateManyInputSchema'

export const BaseJobCreateManyArgsSchema: z.ZodType<Prisma.BaseJobCreateManyArgs> = z.object({
  data: z.union([ BaseJobCreateManyInputSchema,BaseJobCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BaseJobCreateManyArgsSchema;
