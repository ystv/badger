import type { Prisma } from '../../client';

import { z } from 'zod';

export const IdentityCreateWithoutUserInputSchema: z.ZodType<Prisma.IdentityCreateWithoutUserInput> = z.object({
  provider: z.string(),
  identityID: z.string()
}).strict();

export default IdentityCreateWithoutUserInputSchema;
