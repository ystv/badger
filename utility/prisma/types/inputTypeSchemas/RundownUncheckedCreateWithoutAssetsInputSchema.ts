import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema } from './RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutRundownInputSchema } from './MetadataUncheckedCreateNestedManyWithoutRundownInputSchema';

export const RundownUncheckedCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUncheckedCreateWithoutAssetsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  items: z.lazy(() => RundownItemUncheckedCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownUncheckedCreateWithoutAssetsInputSchema;
