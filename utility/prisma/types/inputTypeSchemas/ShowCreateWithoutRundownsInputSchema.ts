import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateNestedManyWithoutShowInputSchema } from './ContinuityItemCreateNestedManyWithoutShowInputSchema';
import { MetadataCreateNestedManyWithoutShowInputSchema } from './MetadataCreateNestedManyWithoutShowInputSchema';

export const ShowCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateWithoutRundownsInput> = z.object({
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutShowInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowCreateWithoutRundownsInputSchema;
