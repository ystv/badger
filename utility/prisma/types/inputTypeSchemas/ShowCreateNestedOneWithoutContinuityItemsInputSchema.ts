import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutContinuityItemsInputSchema } from './ShowCreateWithoutContinuityItemsInputSchema';
import { ShowUncheckedCreateWithoutContinuityItemsInputSchema } from './ShowUncheckedCreateWithoutContinuityItemsInputSchema';
import { ShowCreateOrConnectWithoutContinuityItemsInputSchema } from './ShowCreateOrConnectWithoutContinuityItemsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';

export const ShowCreateNestedOneWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutContinuityItemsInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutContinuityItemsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict();

export default ShowCreateNestedOneWithoutContinuityItemsInputSchema;
