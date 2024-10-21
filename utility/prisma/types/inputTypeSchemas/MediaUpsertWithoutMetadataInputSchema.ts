import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaUpdateWithoutMetadataInputSchema } from './MediaUpdateWithoutMetadataInputSchema';
import { MediaUncheckedUpdateWithoutMetadataInputSchema } from './MediaUncheckedUpdateWithoutMetadataInputSchema';
import { MediaCreateWithoutMetadataInputSchema } from './MediaCreateWithoutMetadataInputSchema';
import { MediaUncheckedCreateWithoutMetadataInputSchema } from './MediaUncheckedCreateWithoutMetadataInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUpsertWithoutMetadataInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export default MediaUpsertWithoutMetadataInputSchema;
