import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';
import { MetadataUpdateManyMutationInputSchema } from './MetadataUpdateManyMutationInputSchema';
import { MetadataUncheckedUpdateManyWithoutFieldInputSchema } from './MetadataUncheckedUpdateManyWithoutFieldInputSchema';

export const MetadataUpdateManyWithWhereWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithWhereWithoutFieldInput> = z.object({
  where: z.lazy(() => MetadataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateManyMutationInputSchema),z.lazy(() => MetadataUncheckedUpdateManyWithoutFieldInputSchema) ]),
}).strict();

export default MetadataUpdateManyWithWhereWithoutFieldInputSchema;
