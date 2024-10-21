import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownUpdateWithoutMetadataInputSchema } from './RundownUpdateWithoutMetadataInputSchema';
import { RundownUncheckedUpdateWithoutMetadataInputSchema } from './RundownUncheckedUpdateWithoutMetadataInputSchema';
import { RundownCreateWithoutMetadataInputSchema } from './RundownCreateWithoutMetadataInputSchema';
import { RundownUncheckedCreateWithoutMetadataInputSchema } from './RundownUncheckedCreateWithoutMetadataInputSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const RundownUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUpsertWithoutMetadataInput> = z.object({
  update: z.union([ z.lazy(() => RundownUpdateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema) ]),
  create: z.union([ z.lazy(() => RundownCreateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema) ]),
  where: z.lazy(() => RundownWhereInputSchema).optional()
}).strict();

export default RundownUpsertWithoutMetadataInputSchema;
