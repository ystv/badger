import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';
import { MetadataUpdateManyMutationInputSchema } from './MetadataUpdateManyMutationInputSchema';
import { MetadataUncheckedUpdateManyWithoutRundownInputSchema } from './MetadataUncheckedUpdateManyWithoutRundownInputSchema';

export const MetadataUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutRundownInput> = z.object({
  where: z.lazy(() => MetadataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateManyMutationInputSchema),z.lazy(() => MetadataUncheckedUpdateManyWithoutRundownInputSchema) ]),
}).strict();

export default MetadataUpdateManyWithWhereWithoutRundownInputSchema;
