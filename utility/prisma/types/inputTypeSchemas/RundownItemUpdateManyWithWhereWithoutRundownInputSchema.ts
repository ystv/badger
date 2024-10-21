import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemScalarWhereInputSchema } from './RundownItemScalarWhereInputSchema';
import { RundownItemUpdateManyMutationInputSchema } from './RundownItemUpdateManyMutationInputSchema';
import { RundownItemUncheckedUpdateManyWithoutRundownInputSchema } from './RundownItemUncheckedUpdateManyWithoutRundownInputSchema';

export const RundownItemUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithWhereWithoutRundownInput> = z.object({
  where: z.lazy(() => RundownItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RundownItemUpdateManyMutationInputSchema),z.lazy(() => RundownItemUncheckedUpdateManyWithoutRundownInputSchema) ]),
}).strict();

export default RundownItemUpdateManyWithWhereWithoutRundownInputSchema;
