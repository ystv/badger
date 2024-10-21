import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownScalarWhereInputSchema } from './RundownScalarWhereInputSchema';
import { RundownUpdateManyMutationInputSchema } from './RundownUpdateManyMutationInputSchema';
import { RundownUncheckedUpdateManyWithoutShowInputSchema } from './RundownUncheckedUpdateManyWithoutShowInputSchema';

export const RundownUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => RundownScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RundownUpdateManyMutationInputSchema),z.lazy(() => RundownUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict();

export default RundownUpdateManyWithWhereWithoutShowInputSchema;
