import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldCreateWithoutValuesInputSchema } from './MetadataFieldCreateWithoutValuesInputSchema';
import { MetadataFieldUncheckedCreateWithoutValuesInputSchema } from './MetadataFieldUncheckedCreateWithoutValuesInputSchema';
import { MetadataFieldCreateOrConnectWithoutValuesInputSchema } from './MetadataFieldCreateOrConnectWithoutValuesInputSchema';
import { MetadataFieldUpsertWithoutValuesInputSchema } from './MetadataFieldUpsertWithoutValuesInputSchema';
import { MetadataFieldWhereUniqueInputSchema } from './MetadataFieldWhereUniqueInputSchema';
import { MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema } from './MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema';
import { MetadataFieldUpdateWithoutValuesInputSchema } from './MetadataFieldUpdateWithoutValuesInputSchema';
import { MetadataFieldUncheckedUpdateWithoutValuesInputSchema } from './MetadataFieldUncheckedUpdateWithoutValuesInputSchema';

export const MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema: z.ZodType<Prisma.MetadataFieldUpdateOneRequiredWithoutValuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetadataFieldCreateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedCreateWithoutValuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MetadataFieldCreateOrConnectWithoutValuesInputSchema).optional(),
  upsert: z.lazy(() => MetadataFieldUpsertWithoutValuesInputSchema).optional(),
  connect: z.lazy(() => MetadataFieldWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MetadataFieldUpdateToOneWithWhereWithoutValuesInputSchema),z.lazy(() => MetadataFieldUpdateWithoutValuesInputSchema),z.lazy(() => MetadataFieldUncheckedUpdateWithoutValuesInputSchema) ]).optional(),
}).strict();

export default MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema;
