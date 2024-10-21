import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithoutRundownInputSchema } from './RundownItemUpdateWithoutRundownInputSchema';
import { RundownItemUncheckedUpdateWithoutRundownInputSchema } from './RundownItemUncheckedUpdateWithoutRundownInputSchema';
import { RundownItemCreateWithoutRundownInputSchema } from './RundownItemCreateWithoutRundownInputSchema';
import { RundownItemUncheckedCreateWithoutRundownInputSchema } from './RundownItemUncheckedCreateWithoutRundownInputSchema';

export const RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpsertWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RundownItemUpdateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedUpdateWithoutRundownInputSchema) ]),
  create: z.union([ z.lazy(() => RundownItemCreateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema;
