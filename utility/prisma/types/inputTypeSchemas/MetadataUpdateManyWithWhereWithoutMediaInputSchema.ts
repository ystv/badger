import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';
import { MetadataUpdateManyMutationInputSchema } from './MetadataUpdateManyMutationInputSchema';
import { MetadataUncheckedUpdateManyWithoutMediaInputSchema } from './MetadataUncheckedUpdateManyWithoutMediaInputSchema';

export const MetadataUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => MetadataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateManyMutationInputSchema),z.lazy(() => MetadataUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export default MetadataUpdateManyWithWhereWithoutMediaInputSchema;
