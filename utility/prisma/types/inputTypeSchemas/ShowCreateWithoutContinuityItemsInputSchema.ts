import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateNestedManyWithoutShowInputSchema } from './RundownCreateNestedManyWithoutShowInputSchema';
import { MetadataCreateNestedManyWithoutShowInputSchema } from './MetadataCreateNestedManyWithoutShowInputSchema';

export const ShowCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowCreateWithoutContinuityItemsInput> = z.object({
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  rundowns: z.lazy(() => RundownCreateNestedManyWithoutShowInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowCreateWithoutContinuityItemsInputSchema;
