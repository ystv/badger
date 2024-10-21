import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from './RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema';
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from './AssetUncheckedCreateNestedManyWithoutRundownInputSchema';

export const RundownUncheckedCreateWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutMetadataInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  items: z.lazy(() => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  assets: z.lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownUncheckedCreateWithoutMetadataInputSchema;
