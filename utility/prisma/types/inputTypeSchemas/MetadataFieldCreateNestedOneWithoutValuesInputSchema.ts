import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldCreateWithoutValuesInputSchema } from './MetadataFieldCreateWithoutValuesInputSchema';
import { MetadataFieldUncheckedCreateWithoutValuesInputSchema } from './MetadataFieldUncheckedCreateWithoutValuesInputSchema';
import { MetadataFieldCreateOrConnectWithoutValuesInputSchema } from './MetadataFieldCreateOrConnectWithoutValuesInputSchema';
import { MetadataFieldWhereUniqueInputSchema } from './MetadataFieldWhereUniqueInputSchema';

export const MetadataFieldCreateNestedOneWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateNestedOneWithoutValuesInput> = z.object({
  create: z.union([ z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MetadataFieldCreateOrConnectWithoutValuesInputSchema).optional(),
  connect: z.lazy(() => MetadataFieldWhereUniqueInputSchema).optional()
}).strict();

export default MetadataFieldCreateNestedOneWithoutValuesInputSchema;
