import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from './RundownItemCreateNestedManyWithoutRundownInputSchema';
import { AssetCreateNestedManyWithoutRundownInputSchema } from './AssetCreateNestedManyWithoutRundownInputSchema';
import { MetadataCreateNestedManyWithoutRundownInputSchema } from './MetadataCreateNestedManyWithoutRundownInputSchema';

export const RundownCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateWithoutShowInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  items: z.lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema).optional(),
  assets: z.lazy(() => AssetCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownCreateWithoutShowInputSchema;
