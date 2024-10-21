import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUncheckedCreateNestedManyWithoutShowInputSchema } from './RundownUncheckedCreateNestedManyWithoutShowInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutShowInputSchema } from './MetadataUncheckedCreateNestedManyWithoutShowInputSchema';

export const ShowUncheckedCreateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutContinuityItemsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  rundowns: z.lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowUncheckedCreateWithoutContinuityItemsInputSchema;
