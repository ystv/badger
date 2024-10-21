import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowCreateWithoutContinuityItemsInputSchema } from './ShowCreateWithoutContinuityItemsInputSchema';
import { ShowUncheckedCreateWithoutContinuityItemsInputSchema } from './ShowUncheckedCreateWithoutContinuityItemsInputSchema';

export const ShowCreateOrConnectWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutContinuityItemsInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema) ]),
}).strict();

export default ShowCreateOrConnectWithoutContinuityItemsInputSchema;
