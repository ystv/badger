import type { Prisma } from '../../client';

import { z } from 'zod';

export const IdentityUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  provider: z.string(),
  identityID: z.string()
}).strict();

export default IdentityUncheckedCreateWithoutUserInputSchema;
