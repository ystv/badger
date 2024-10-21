import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from './AssetUncheckedCreateNestedManyWithoutRundownInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutRundownInputSchema } from './MetadataUncheckedCreateNestedManyWithoutRundownInputSchema';

export const RundownUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutItemsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  assets: z.lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownUncheckedCreateWithoutItemsInputSchema;
