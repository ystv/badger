import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityWhereUniqueInputSchema } from './IdentityWhereUniqueInputSchema';
import { IdentityCreateWithoutUserInputSchema } from './IdentityCreateWithoutUserInputSchema';
import { IdentityUncheckedCreateWithoutUserInputSchema } from './IdentityUncheckedCreateWithoutUserInputSchema';

export const IdentityCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.IdentityCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => IdentityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IdentityCreateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default IdentityCreateOrConnectWithoutUserInputSchema;
