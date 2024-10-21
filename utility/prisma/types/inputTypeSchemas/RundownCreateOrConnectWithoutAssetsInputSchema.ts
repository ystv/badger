import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownCreateWithoutAssetsInputSchema } from './RundownCreateWithoutAssetsInputSchema';
import { RundownUncheckedCreateWithoutAssetsInputSchema } from './RundownUncheckedCreateWithoutAssetsInputSchema';

export const RundownCreateOrConnectWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutAssetsInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownCreateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema) ]),
}).strict();

export default RundownCreateOrConnectWithoutAssetsInputSchema;
