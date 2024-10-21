import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutItemsInputSchema } from './RundownCreateWithoutItemsInputSchema';
import { RundownUncheckedCreateWithoutItemsInputSchema } from './RundownUncheckedCreateWithoutItemsInputSchema';
import { RundownCreateOrConnectWithoutItemsInputSchema } from './RundownCreateOrConnectWithoutItemsInputSchema';
import { RundownUpsertWithoutItemsInputSchema } from './RundownUpsertWithoutItemsInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateToOneWithWhereWithoutItemsInputSchema } from './RundownUpdateToOneWithWhereWithoutItemsInputSchema';
import { RundownUpdateWithoutItemsInputSchema } from './RundownUpdateWithoutItemsInputSchema';
import { RundownUncheckedUpdateWithoutItemsInputSchema } from './RundownUncheckedUpdateWithoutItemsInputSchema';

export const RundownUpdateOneRequiredWithoutItemsNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneRequiredWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutItemsInputSchema).optional(),
  upsert: z.lazy(() => RundownUpsertWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RundownUpdateToOneWithWhereWithoutItemsInputSchema),z.lazy(() => RundownUpdateWithoutItemsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutItemsInputSchema) ]).optional(),
}).strict();

export default RundownUpdateOneRequiredWithoutItemsNestedInputSchema;
