import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';
import { MetadataUpdateManyMutationInputSchema } from './MetadataUpdateManyMutationInputSchema';
import { MetadataUncheckedUpdateManyWithoutShowInputSchema } from './MetadataUncheckedUpdateManyWithoutShowInputSchema';

export const MetadataUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => MetadataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateManyMutationInputSchema),z.lazy(() => MetadataUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict();

export default MetadataUpdateManyWithWhereWithoutShowInputSchema;
