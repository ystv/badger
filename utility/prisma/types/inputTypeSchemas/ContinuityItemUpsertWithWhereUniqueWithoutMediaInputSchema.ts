import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithoutMediaInputSchema } from './ContinuityItemUpdateWithoutMediaInputSchema';
import { ContinuityItemUncheckedUpdateWithoutMediaInputSchema } from './ContinuityItemUncheckedUpdateWithoutMediaInputSchema';
import { ContinuityItemCreateWithoutMediaInputSchema } from './ContinuityItemCreateWithoutMediaInputSchema';
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from './ContinuityItemUncheckedCreateWithoutMediaInputSchema';

export const ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema;
