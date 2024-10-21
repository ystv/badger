import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutMediaInputSchema } from './MetadataUpdateWithoutMediaInputSchema';
import { MetadataUncheckedUpdateWithoutMediaInputSchema } from './MetadataUncheckedUpdateWithoutMediaInputSchema';

export const MetadataUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export default MetadataUpdateWithWhereUniqueWithoutMediaInputSchema;
