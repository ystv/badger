import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUpdateWithoutAssetsInputSchema } from './RundownUpdateWithoutAssetsInputSchema';
import { RundownUncheckedUpdateWithoutAssetsInputSchema } from './RundownUncheckedUpdateWithoutAssetsInputSchema';
import { RundownCreateWithoutAssetsInputSchema } from './RundownCreateWithoutAssetsInputSchema';
import { RundownUncheckedCreateWithoutAssetsInputSchema } from './RundownUncheckedCreateWithoutAssetsInputSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const RundownUpsertWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpsertWithoutAssetsInput> = z.object({
  update: z.union([ z.lazy(() => RundownUpdateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema) ]),
  create: z.union([ z.lazy(() => RundownCreateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema) ]),
  where: z.lazy(() => RundownWhereInputSchema).optional()
}).strict();

export default RundownUpsertWithoutAssetsInputSchema;
