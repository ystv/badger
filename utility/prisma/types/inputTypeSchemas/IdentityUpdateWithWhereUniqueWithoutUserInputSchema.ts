import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityWhereUniqueInputSchema } from './IdentityWhereUniqueInputSchema';
import { IdentityUpdateWithoutUserInputSchema } from './IdentityUpdateWithoutUserInputSchema';
import { IdentityUncheckedUpdateWithoutUserInputSchema } from './IdentityUncheckedUpdateWithoutUserInputSchema';

export const IdentityUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IdentityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IdentityUpdateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default IdentityUpdateWithWhereUniqueWithoutUserInputSchema;
