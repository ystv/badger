import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaUpdateWithoutAssetsInputSchema } from './MediaUpdateWithoutAssetsInputSchema';
import { MediaUncheckedUpdateWithoutAssetsInputSchema } from './MediaUncheckedUpdateWithoutAssetsInputSchema';
import { MediaCreateWithoutAssetsInputSchema } from './MediaCreateWithoutAssetsInputSchema';
import { MediaUncheckedCreateWithoutAssetsInputSchema } from './MediaUncheckedCreateWithoutAssetsInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaUpsertWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutAssetsInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export default MediaUpsertWithoutAssetsInputSchema;
