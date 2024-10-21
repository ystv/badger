import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemScalarWhereInputSchema } from './RundownItemScalarWhereInputSchema';
import { RundownItemUpdateManyMutationInputSchema } from './RundownItemUpdateManyMutationInputSchema';
import { RundownItemUncheckedUpdateManyWithoutMediaInputSchema } from './RundownItemUncheckedUpdateManyWithoutMediaInputSchema';

export const RundownItemUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => RundownItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RundownItemUpdateManyMutationInputSchema),z.lazy(() => RundownItemUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export default RundownItemUpdateManyWithWhereWithoutMediaInputSchema;
