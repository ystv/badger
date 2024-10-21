import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionScalarWhereInputSchema } from './ConnectionScalarWhereInputSchema';
import { ConnectionUpdateManyMutationInputSchema } from './ConnectionUpdateManyMutationInputSchema';
import { ConnectionUncheckedUpdateManyWithoutUserInputSchema } from './ConnectionUncheckedUpdateManyWithoutUserInputSchema';

export const ConnectionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ConnectionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConnectionUpdateManyMutationInputSchema),z.lazy(() => ConnectionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ConnectionUpdateManyWithWhereWithoutUserInputSchema;
