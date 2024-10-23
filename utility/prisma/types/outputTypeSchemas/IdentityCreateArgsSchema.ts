import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityCreateInputSchema } from '../inputTypeSchemas/IdentityCreateInputSchema'
import { IdentityUncheckedCreateInputSchema } from '../inputTypeSchemas/IdentityUncheckedCreateInputSchema'

export const IdentityCreateArgsSchema: z.ZodType<Omit<Prisma.IdentityCreateArgs, "select" | "include">> = z.object({
  data: z.union([ IdentityCreateInputSchema,IdentityUncheckedCreateInputSchema ]),
}).strict() ;

export default IdentityCreateArgsSchema;
