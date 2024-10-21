import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityCreateManyInputSchema } from '../inputTypeSchemas/IdentityCreateManyInputSchema'

export const IdentityCreateManyArgsSchema: z.ZodType<Prisma.IdentityCreateManyArgs> = z.object({
  data: z.union([ IdentityCreateManyInputSchema,IdentityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default IdentityCreateManyArgsSchema;
