import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutAssetsInputSchema } from './MediaCreateWithoutAssetsInputSchema';
import { MediaUncheckedCreateWithoutAssetsInputSchema } from './MediaUncheckedCreateWithoutAssetsInputSchema';
import { MediaCreateOrConnectWithoutAssetsInputSchema } from './MediaCreateOrConnectWithoutAssetsInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';

export const MediaCreateNestedOneWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutAssetsInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutAssetsInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export default MediaCreateNestedOneWithoutAssetsInputSchema;
