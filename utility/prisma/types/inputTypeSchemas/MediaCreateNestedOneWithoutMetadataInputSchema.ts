import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutMetadataInputSchema } from './MediaCreateWithoutMetadataInputSchema';
import { MediaUncheckedCreateWithoutMetadataInputSchema } from './MediaUncheckedCreateWithoutMetadataInputSchema';
import { MediaCreateOrConnectWithoutMetadataInputSchema } from './MediaCreateOrConnectWithoutMetadataInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';

export const MediaCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutMetadataInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutMetadataInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export default MediaCreateNestedOneWithoutMetadataInputSchema;
