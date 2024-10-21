import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownCreateWithoutShowInputSchema } from './RundownCreateWithoutShowInputSchema';
import { RundownUncheckedCreateWithoutShowInputSchema } from './RundownUncheckedCreateWithoutShowInputSchema';

export const RundownCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownCreateWithoutShowInputSchema),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default RundownCreateOrConnectWithoutShowInputSchema;
