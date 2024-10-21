import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemScalarWhereInputSchema } from './ContinuityItemScalarWhereInputSchema';
import { ContinuityItemUpdateManyMutationInputSchema } from './ContinuityItemUpdateManyMutationInputSchema';
import { ContinuityItemUncheckedUpdateManyWithoutMediaInputSchema } from './ContinuityItemUncheckedUpdateManyWithoutMediaInputSchema';

export const ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => ContinuityItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContinuityItemUpdateManyMutationInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export default ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema;
