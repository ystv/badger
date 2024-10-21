import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaCreateWithoutMetadataInputSchema } from './MediaCreateWithoutMetadataInputSchema';
import { MediaUncheckedCreateWithoutMetadataInputSchema } from './MediaUncheckedCreateWithoutMetadataInputSchema';

export const MediaCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutMetadataInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema) ]),
}).strict();

export default MediaCreateOrConnectWithoutMetadataInputSchema;
