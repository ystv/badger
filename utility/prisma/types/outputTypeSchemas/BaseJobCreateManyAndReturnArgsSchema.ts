import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobCreateManyInputSchema } from '../inputTypeSchemas/BaseJobCreateManyInputSchema'

export const BaseJobCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BaseJobCreateManyAndReturnArgs> = z.object({
  data: z.union([ BaseJobCreateManyInputSchema,BaseJobCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BaseJobCreateManyAndReturnArgsSchema;
