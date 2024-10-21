import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutAssetsInputSchema } from './RundownCreateWithoutAssetsInputSchema';
import { RundownUncheckedCreateWithoutAssetsInputSchema } from './RundownUncheckedCreateWithoutAssetsInputSchema';
import { RundownCreateOrConnectWithoutAssetsInputSchema } from './RundownCreateOrConnectWithoutAssetsInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';

export const RundownCreateNestedOneWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutAssetsInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutAssetsInputSchema).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional()
}).strict();

export default RundownCreateNestedOneWithoutAssetsInputSchema;
