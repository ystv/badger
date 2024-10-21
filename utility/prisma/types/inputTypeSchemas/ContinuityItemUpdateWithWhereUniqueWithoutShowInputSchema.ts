import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithoutShowInputSchema } from './ContinuityItemUpdateWithoutShowInputSchema';
import { ContinuityItemUncheckedUpdateWithoutShowInputSchema } from './ContinuityItemUncheckedUpdateWithoutShowInputSchema';

export const ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContinuityItemUpdateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateWithoutShowInputSchema) ]),
}).strict();

export default ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema;
