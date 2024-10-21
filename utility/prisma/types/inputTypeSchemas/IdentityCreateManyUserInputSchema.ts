import type { Prisma } from '../../client';

import { z } from 'zod';

export const IdentityCreateManyUserInputSchema: z.ZodType<Prisma.IdentityCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  provider: z.string(),
  identityID: z.string()
}).strict();

export default IdentityCreateManyUserInputSchema;
