import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutIdentitiesInputSchema } from './UserCreateNestedOneWithoutIdentitiesInputSchema';

export const IdentityCreateInputSchema: z.ZodType<Prisma.IdentityCreateInput> = z.object({
  provider: z.string(),
  identityID: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutIdentitiesInputSchema)
}).strict();

export default IdentityCreateInputSchema;
