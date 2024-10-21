import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityScalarWhereInputSchema } from './IdentityScalarWhereInputSchema';
import { IdentityUpdateManyMutationInputSchema } from './IdentityUpdateManyMutationInputSchema';
import { IdentityUncheckedUpdateManyWithoutUserInputSchema } from './IdentityUncheckedUpdateManyWithoutUserInputSchema';

export const IdentityUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => IdentityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IdentityUpdateManyMutationInputSchema),z.lazy(() => IdentityUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default IdentityUpdateManyWithWhereWithoutUserInputSchema;
