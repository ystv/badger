import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUncheckedCreateNestedManyWithoutShowInputSchema } from './RundownUncheckedCreateNestedManyWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema } from './ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutShowInputSchema } from './MetadataUncheckedCreateNestedManyWithoutShowInputSchema';

export const ShowUncheckedCreateInputSchema: z.ZodType<Prisma.ShowUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  rundowns: z.lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowUncheckedCreateInputSchema;
