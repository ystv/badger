import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemCreateWithoutShowInputSchema } from './ContinuityItemCreateWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateWithoutShowInputSchema } from './ContinuityItemUncheckedCreateWithoutShowInputSchema';

export const ContinuityItemCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default ContinuityItemCreateOrConnectWithoutShowInputSchema;
