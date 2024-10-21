import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemScalarWhereInputSchema } from './ContinuityItemScalarWhereInputSchema';
import { ContinuityItemUpdateManyMutationInputSchema } from './ContinuityItemUpdateManyMutationInputSchema';
import { ContinuityItemUncheckedUpdateManyWithoutShowInputSchema } from './ContinuityItemUncheckedUpdateManyWithoutShowInputSchema';

export const ContinuityItemUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => ContinuityItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContinuityItemUpdateManyMutationInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict();

export default ContinuityItemUpdateManyWithWhereWithoutShowInputSchema;
