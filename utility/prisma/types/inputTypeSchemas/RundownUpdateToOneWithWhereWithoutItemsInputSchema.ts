import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';
import { RundownUpdateWithoutItemsInputSchema } from './RundownUpdateWithoutItemsInputSchema';
import { RundownUncheckedUpdateWithoutItemsInputSchema } from './RundownUncheckedUpdateWithoutItemsInputSchema';

export const RundownUpdateToOneWithWhereWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutItemsInput> = z.object({
  where: z.lazy(() => RundownWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RundownUpdateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema) ]),
}).strict();

export default RundownUpdateToOneWithWhereWithoutItemsInputSchema;
