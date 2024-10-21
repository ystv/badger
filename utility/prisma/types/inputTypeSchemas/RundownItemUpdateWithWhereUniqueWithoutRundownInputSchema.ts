import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithoutRundownInputSchema } from './RundownItemUpdateWithoutRundownInputSchema';
import { RundownItemUncheckedUpdateWithoutRundownInputSchema } from './RundownItemUncheckedUpdateWithoutRundownInputSchema';

export const RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemUpdateWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RundownItemUpdateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedUpdateWithoutRundownInputSchema) ]),
}).strict();

export default RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema;
