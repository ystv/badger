import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldWhereUniqueInputSchema } from './MetadataFieldWhereUniqueInputSchema';
import { MetadataFieldCreateWithoutValuesInputSchema } from './MetadataFieldCreateWithoutValuesInputSchema';
import { MetadataFieldUncheckedCreateWithoutValuesInputSchema } from './MetadataFieldUncheckedCreateWithoutValuesInputSchema';

export const MetadataFieldCreateOrConnectWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateOrConnectWithoutValuesInput> = z.object({
  where: z.lazy(() => MetadataFieldWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema) ]),
}).strict();

export default MetadataFieldCreateOrConnectWithoutValuesInputSchema;
