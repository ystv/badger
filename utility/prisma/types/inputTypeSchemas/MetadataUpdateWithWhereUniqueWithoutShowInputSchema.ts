import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutShowInputSchema } from './MetadataUpdateWithoutShowInputSchema';
import { MetadataUncheckedUpdateWithoutShowInputSchema } from './MetadataUncheckedUpdateWithoutShowInputSchema';

export const MetadataUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutShowInputSchema) ]),
}).strict();

export default MetadataUpdateWithWhereUniqueWithoutShowInputSchema;
