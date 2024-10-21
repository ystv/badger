import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';
import { RundownUpdateWithoutAssetsInputSchema } from './RundownUpdateWithoutAssetsInputSchema';
import { RundownUncheckedUpdateWithoutAssetsInputSchema } from './RundownUncheckedUpdateWithoutAssetsInputSchema';

export const RundownUpdateToOneWithWhereWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutAssetsInput> = z.object({
  where: z.lazy(() => RundownWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RundownUpdateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema) ]),
}).strict();

export default RundownUpdateToOneWithWhereWithoutAssetsInputSchema;
