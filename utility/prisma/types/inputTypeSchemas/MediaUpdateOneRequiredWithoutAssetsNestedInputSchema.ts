import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutAssetsInputSchema } from './MediaCreateWithoutAssetsInputSchema';
import { MediaUncheckedCreateWithoutAssetsInputSchema } from './MediaUncheckedCreateWithoutAssetsInputSchema';
import { MediaCreateOrConnectWithoutAssetsInputSchema } from './MediaCreateOrConnectWithoutAssetsInputSchema';
import { MediaUpsertWithoutAssetsInputSchema } from './MediaUpsertWithoutAssetsInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaUpdateToOneWithWhereWithoutAssetsInputSchema } from './MediaUpdateToOneWithWhereWithoutAssetsInputSchema';
import { MediaUpdateWithoutAssetsInputSchema } from './MediaUpdateWithoutAssetsInputSchema';
import { MediaUncheckedUpdateWithoutAssetsInputSchema } from './MediaUncheckedUpdateWithoutAssetsInputSchema';

export const MediaUpdateOneRequiredWithoutAssetsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutAssetsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAssetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutAssetsInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutAssetsInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutAssetsInputSchema),z.lazy(() => MediaUpdateWithoutAssetsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutAssetsInputSchema) ]).optional(),
}).strict();

export default MediaUpdateOneRequiredWithoutAssetsNestedInputSchema;
