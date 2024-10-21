import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateNestedOneWithoutRundownsInputSchema } from './ShowCreateNestedOneWithoutRundownsInputSchema';
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from './RundownItemCreateNestedManyWithoutRundownInputSchema';
import { AssetCreateNestedManyWithoutRundownInputSchema } from './AssetCreateNestedManyWithoutRundownInputSchema';
import { MetadataCreateNestedManyWithoutRundownInputSchema } from './MetadataCreateNestedManyWithoutRundownInputSchema';

export const RundownCreateInputSchema: z.ZodType<Prisma.RundownCreateInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
  items: z.lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema).optional(),
  assets: z.lazy(() => AssetCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownCreateInputSchema;
