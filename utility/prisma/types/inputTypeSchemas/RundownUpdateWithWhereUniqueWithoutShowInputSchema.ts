import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateWithoutShowInputSchema } from './RundownUpdateWithoutShowInputSchema';
import { RundownUncheckedUpdateWithoutShowInputSchema } from './RundownUncheckedUpdateWithoutShowInputSchema';

export const RundownUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RundownUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RundownUpdateWithoutShowInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutShowInputSchema) ]),
}).strict();

export default RundownUpdateWithWhereUniqueWithoutShowInputSchema;
