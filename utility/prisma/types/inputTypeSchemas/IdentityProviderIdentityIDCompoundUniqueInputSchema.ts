import type { Prisma } from '../../client';

import { z } from 'zod';

export const IdentityProviderIdentityIDCompoundUniqueInputSchema: z.ZodType<Prisma.IdentityProviderIdentityIDCompoundUniqueInput> = z.object({
  provider: z.string(),
  identityID: z.string()
}).strict();

export default IdentityProviderIdentityIDCompoundUniqueInputSchema;
