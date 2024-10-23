import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaUpdateWithoutContinuityItemsInputSchema } from './MediaUpdateWithoutContinuityItemsInputSchema';
import { MediaUncheckedUpdateWithoutContinuityItemsInputSchema } from './MediaUncheckedUpdateWithoutContinuityItemsInputSchema';

export const MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutContinuityItemsInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema) ]),
}).strict();

export default MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema;
