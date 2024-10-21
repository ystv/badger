import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutRundownInputSchema } from './MetadataUpdateWithoutRundownInputSchema';
import { MetadataUncheckedUpdateWithoutRundownInputSchema } from './MetadataUncheckedUpdateWithoutRundownInputSchema';

export const MetadataUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MetadataUpdateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutRundownInputSchema) ]),
}).strict();

export default MetadataUpdateWithWhereUniqueWithoutRundownInputSchema;
