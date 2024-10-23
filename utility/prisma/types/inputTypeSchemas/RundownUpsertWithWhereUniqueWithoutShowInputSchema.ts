import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateWithoutShowInputSchema } from './RundownUpdateWithoutShowInputSchema';
import { RundownUncheckedUpdateWithoutShowInputSchema } from './RundownUncheckedUpdateWithoutShowInputSchema';
import { RundownCreateWithoutShowInputSchema } from './RundownCreateWithoutShowInputSchema';
import { RundownUncheckedCreateWithoutShowInputSchema } from './RundownUncheckedCreateWithoutShowInputSchema';

export const RundownUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.RundownUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RundownUpdateWithoutShowInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => RundownCreateWithoutShowInputSchema),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default RundownUpsertWithWhereUniqueWithoutShowInputSchema;
