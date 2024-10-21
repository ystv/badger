import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutFieldInputSchema } from './MetadataUpdateWithoutFieldInputSchema';
import { MetadataUncheckedUpdateWithoutFieldInputSchema } from './MetadataUncheckedUpdateWithoutFieldInputSchema';

export const MetadataUpdateWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutFieldInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutFieldInputSchema) ]),
}).strict();

export default MetadataUpdateWithWhereUniqueWithoutFieldInputSchema;
