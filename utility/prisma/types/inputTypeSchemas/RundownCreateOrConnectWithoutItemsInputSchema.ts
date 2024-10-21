import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownCreateWithoutItemsInputSchema } from './RundownCreateWithoutItemsInputSchema';
import { RundownUncheckedCreateWithoutItemsInputSchema } from './RundownUncheckedCreateWithoutItemsInputSchema';

export const RundownCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownCreateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export default RundownCreateOrConnectWithoutItemsInputSchema;
