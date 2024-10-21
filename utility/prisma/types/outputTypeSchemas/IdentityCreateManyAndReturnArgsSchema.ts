import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityCreateManyInputSchema } from '../inputTypeSchemas/IdentityCreateManyInputSchema'

export const IdentityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IdentityCreateManyAndReturnArgs> = z.object({
  data: z.union([ IdentityCreateManyInputSchema,IdentityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default IdentityCreateManyAndReturnArgsSchema;
