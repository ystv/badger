import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithoutMediaInputSchema } from './ContinuityItemUpdateWithoutMediaInputSchema';
import { ContinuityItemUncheckedUpdateWithoutMediaInputSchema } from './ContinuityItemUncheckedUpdateWithoutMediaInputSchema';

export const ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export default ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema;
