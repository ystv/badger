import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemCreateWithoutMediaInputSchema } from './ContinuityItemCreateWithoutMediaInputSchema';
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from './ContinuityItemUncheckedCreateWithoutMediaInputSchema';

export const ContinuityItemCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => ContinuityItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default ContinuityItemCreateOrConnectWithoutMediaInputSchema;
