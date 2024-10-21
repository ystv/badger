import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateNestedOneWithoutRundownsInputSchema } from './ShowCreateNestedOneWithoutRundownsInputSchema';
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from './RundownItemCreateNestedManyWithoutRundownInputSchema';
import { MetadataCreateNestedManyWithoutRundownInputSchema } from './MetadataCreateNestedManyWithoutRundownInputSchema';

export const RundownCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateWithoutAssetsInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
  items: z.lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutRundownInputSchema).optional()
}).strict();

export default RundownCreateWithoutAssetsInputSchema;
