import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from './RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema';
import { AssetUncheckedCreateNestedManyWithoutRundownInputSchema } from './AssetUncheckedCreateNestedManyWithoutRundownInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutRundownInputSchema } from './MetadataUncheckedCreateNestedManyWithoutRundownInputSchema';

export const RundownUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutShowInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  items: z.lazy(() => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  assets: z.lazy(() => AssetUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownUncheckedCreateWithoutShowInputSchema;
