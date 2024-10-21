import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithoutShowInputSchema } from './ContinuityItemUpdateWithoutShowInputSchema';
import { ContinuityItemUncheckedUpdateWithoutShowInputSchema } from './ContinuityItemUncheckedUpdateWithoutShowInputSchema';
import { ContinuityItemCreateWithoutShowInputSchema } from './ContinuityItemCreateWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateWithoutShowInputSchema } from './ContinuityItemUncheckedCreateWithoutShowInputSchema';

export const ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContinuityItemUpdateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema;
