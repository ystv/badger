import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaCreateWithoutAssetsInputSchema } from './MediaCreateWithoutAssetsInputSchema';
import { MediaUncheckedCreateWithoutAssetsInputSchema } from './MediaUncheckedCreateWithoutAssetsInputSchema';

export const MediaCreateOrConnectWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutAssetsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema) ]),
}).strict();

export default MediaCreateOrConnectWithoutAssetsInputSchema;
