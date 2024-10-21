import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutFieldInputSchema } from './MetadataUpdateWithoutFieldInputSchema';
import { MetadataUncheckedUpdateWithoutFieldInputSchema } from './MetadataUncheckedUpdateWithoutFieldInputSchema';
import { MetadataCreateWithoutFieldInputSchema } from './MetadataCreateWithoutFieldInputSchema';
import { MetadataUncheckedCreateWithoutFieldInputSchema } from './MetadataUncheckedCreateWithoutFieldInputSchema';

export const MetadataUpsertWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutFieldInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MetadataUpdateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutFieldInputSchema) ]),
  create: z.union([ z.lazy(() => MetadataCreateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema) ]),
}).strict();

export default MetadataUpsertWithWhereUniqueWithoutFieldInputSchema;
