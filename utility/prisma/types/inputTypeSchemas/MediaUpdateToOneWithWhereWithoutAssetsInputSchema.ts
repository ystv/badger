import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaUpdateWithoutAssetsInputSchema } from './MediaUpdateWithoutAssetsInputSchema';
import { MediaUncheckedUpdateWithoutAssetsInputSchema } from './MediaUncheckedUpdateWithoutAssetsInputSchema';

export const MediaUpdateToOneWithWhereWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutAssetsInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema) ]),
}).strict();

export default MediaUpdateToOneWithWhereWithoutAssetsInputSchema;
