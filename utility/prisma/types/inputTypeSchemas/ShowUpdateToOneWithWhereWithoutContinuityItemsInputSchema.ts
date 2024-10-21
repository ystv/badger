import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { ShowUpdateWithoutContinuityItemsInputSchema } from './ShowUpdateWithoutContinuityItemsInputSchema';
import { ShowUncheckedUpdateWithoutContinuityItemsInputSchema } from './ShowUncheckedUpdateWithoutContinuityItemsInputSchema';

export const ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutContinuityItemsInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema) ]),
}).strict();

export default ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema;
