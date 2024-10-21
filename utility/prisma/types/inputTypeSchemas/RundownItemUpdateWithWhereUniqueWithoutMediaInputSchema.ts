import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithoutMediaInputSchema } from './RundownItemUpdateWithoutMediaInputSchema';
import { RundownItemUncheckedUpdateWithoutMediaInputSchema } from './RundownItemUncheckedUpdateWithoutMediaInputSchema';

export const RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export default RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema;
