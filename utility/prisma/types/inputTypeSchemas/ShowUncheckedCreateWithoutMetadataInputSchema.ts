import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUncheckedCreateNestedManyWithoutShowInputSchema } from './RundownUncheckedCreateNestedManyWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema } from './ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema';

export const ShowUncheckedCreateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutMetadataInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  start: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable(),
  rundowns: z.lazy(() => RundownUncheckedCreateNestedManyWithoutShowInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowUncheckedCreateWithoutMetadataInputSchema;
