import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateNestedOneWithoutRundownsInputSchema } from './ShowCreateNestedOneWithoutRundownsInputSchema';
import { AssetCreateNestedManyWithoutRundownInputSchema } from './AssetCreateNestedManyWithoutRundownInputSchema';
import { MetadataCreateNestedManyWithoutRundownInputSchema } from './MetadataCreateNestedManyWithoutRundownInputSchema';

export const RundownCreateWithoutItemsInputSchema: z.ZodType<Prisma.RundownCreateWithoutItemsInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
  assets: z.lazy(() => AssetCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownCreateWithoutItemsInputSchema;
