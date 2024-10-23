import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowUpdateWithoutContinuityItemsInputSchema } from './ShowUpdateWithoutContinuityItemsInputSchema';
import { ShowUncheckedUpdateWithoutContinuityItemsInputSchema } from './ShowUncheckedUpdateWithoutContinuityItemsInputSchema';
import { ShowCreateWithoutContinuityItemsInputSchema } from './ShowCreateWithoutContinuityItemsInputSchema';
import { ShowUncheckedCreateWithoutContinuityItemsInputSchema } from './ShowUncheckedCreateWithoutContinuityItemsInputSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowUpsertWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpsertWithoutContinuityItemsInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export default ShowUpsertWithoutContinuityItemsInputSchema;
