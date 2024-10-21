import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';
import { RundownUpdateWithoutMetadataInputSchema } from './RundownUpdateWithoutMetadataInputSchema';
import { RundownUncheckedUpdateWithoutMetadataInputSchema } from './RundownUncheckedUpdateWithoutMetadataInputSchema';

export const RundownUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.RundownUpdateToOneWithWhereWithoutMetadataInput> = z.object({
  where: z.lazy(() => RundownWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RundownUpdateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema) ]),
}).strict();

export default RundownUpdateToOneWithWhereWithoutMetadataInputSchema;
