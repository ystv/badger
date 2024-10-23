import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldWhereInputSchema } from './MetadataFieldWhereInputSchema';
import { MetadataFieldUpdateWithoutValuesInputSchema } from './MetadataFieldUpdateWithoutValuesInputSchema';
import { MetadataFieldUncheckedUpdateWithoutValuesInputSchema } from './MetadataFieldUncheckedUpdateWithoutValuesInputSchema';

export const MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldUpdateToOneWithWhereWithoutValuesInput> = z.object({
  where: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema) ]),
}).strict();

export default MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema;
