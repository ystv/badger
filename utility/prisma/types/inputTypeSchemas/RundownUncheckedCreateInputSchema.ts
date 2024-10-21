import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from './RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema';
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from './AssetUncheckedCreateNestedManyWithoutRundownInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutRundownInputSchema } from './MetadataUncheckedCreateNestedManyWithoutRundownInputSchema';

export const RundownUncheckedCreateInputSchema: z.ZodType<Prisma.RundownUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  items: z.lazy(() => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  assets: z.lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownUncheckedCreateInputSchema;
