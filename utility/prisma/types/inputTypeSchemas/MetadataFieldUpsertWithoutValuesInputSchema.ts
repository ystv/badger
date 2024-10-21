import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldUpdateWithoutValuesInputSchema } from './MetadataFieldUpdateWithoutValuesInputSchema';
import { MetadataFieldUncheckedUpdateWithoutValuesInputSchema } from './MetadataFieldUncheckedUpdateWithoutValuesInputSchema';
import { MetadataFieldCreateWithoutValuesInputSchema } from './MetadataFieldCreateWithoutValuesInputSchema';
import { MetadataFieldUncheckedCreateWithoutValuesInputSchema } from './MetadataFieldUncheckedCreateWithoutValuesInputSchema';
import { MetadataFieldWhereInputSchema } from './MetadataFieldWhereInputSchema';

export const MetadataFieldUpsertWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUpsertWithoutValuesInput> = z.object({
  update: z.union([ z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema) ]),
  create: z.union([ z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema) ]),
  where: z.lazy(() => MetadataFieldWhereInputSchema).optional()
}).strict();

export default MetadataFieldUpsertWithoutValuesInputSchema;
