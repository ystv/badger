import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutMetadataInputSchema } from './MediaCreateWithoutMetadataInputSchema';
import { MediaUncheckedCreateWithoutMetadataInputSchema } from './MediaUncheckedCreateWithoutMetadataInputSchema';
import { MediaCreateOrConnectWithoutMetadataInputSchema } from './MediaCreateOrConnectWithoutMetadataInputSchema';
import { MediaUpsertWithoutMetadataInputSchema } from './MediaUpsertWithoutMetadataInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaUpdateToOneWithWhereWithoutMetadataInputSchema } from './MediaUpdateToOneWithWhereWithoutMetadataInputSchema';
import { MediaUpdateWithoutMetadataInputSchema } from './MediaUpdateWithoutMetadataInputSchema';
import { MediaUncheckedUpdateWithoutMetadataInputSchema } from './MediaUncheckedUpdateWithoutMetadataInputSchema';

export const MediaUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutMetadataNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutMetadataInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutMetadataInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutMetadataInputSchema),z.lazy(() => MediaUpdateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema) ]).optional(),
}).strict();

export default MediaUpdateOneWithoutMetadataNestedInputSchema;
