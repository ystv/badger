import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateNestedManyWithoutShowInputSchema } from './RundownCreateNestedManyWithoutShowInputSchema';
import { ContinuityItemCreateNestedManyWithoutShowInputSchema } from './ContinuityItemCreateNestedManyWithoutShowInputSchema';
import { MetadataCreateNestedManyWithoutShowInputSchema } from './MetadataCreateNestedManyWithoutShowInputSchema';

export const ShowCreateInputSchema: z.ZodType<Prisma.ShowCreateInput> = z.object({
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  rundowns: z.lazy(() => RundownCreateNestedManyWithoutShowInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowCreateInputSchema;
