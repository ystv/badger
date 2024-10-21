import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutItemsInputSchema } from './RundownCreateWithoutItemsInputSchema';
import { RundownUncheckedCreateWithoutItemsInputSchema } from './RundownUncheckedCreateWithoutItemsInputSchema';
import { RundownCreateOrConnectWithoutItemsInputSchema } from './RundownCreateOrConnectWithoutItemsInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';

export const RundownCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional()
}).strict();

export default RundownCreateNestedOneWithoutItemsInputSchema;
