import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUpdateWithoutItemsInputSchema } from './RundownUpdateWithoutItemsInputSchema';
import { RundownUncheckedUpdateWithoutItemsInputSchema } from './RundownUncheckedUpdateWithoutItemsInputSchema';
import { RundownCreateWithoutItemsInputSchema } from './RundownCreateWithoutItemsInputSchema';
import { RundownUncheckedCreateWithoutItemsInputSchema } from './RundownUncheckedCreateWithoutItemsInputSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const RundownUpsertWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpsertWithoutItemsInput> = z.object({
  update: z.union([ z.lazy(() => RundownUpdateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => RundownCreateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema) ]),
  where: z.lazy(() => RundownWhereInputSchema).optional()
}).strict();

export default RundownUpsertWithoutItemsInputSchema;
