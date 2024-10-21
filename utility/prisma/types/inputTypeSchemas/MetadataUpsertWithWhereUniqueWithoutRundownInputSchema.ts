import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutRundownInputSchema } from './MetadataUpdateWithoutRundownInputSchema';
import { MetadataUncheckedUpdateWithoutRundownInputSchema } from './MetadataUncheckedUpdateWithoutRundownInputSchema';
import { MetadataCreateWithoutRundownInputSchema } from './MetadataCreateWithoutRundownInputSchema';
import { MetadataUncheckedCreateWithoutRundownInputSchema } from './MetadataUncheckedCreateWithoutRundownInputSchema';

export const MetadataUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MetadataUpdateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutRundownInputSchema) ]),
  create: z.union([ z.lazy(() => MetadataCreateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default MetadataUpsertWithWhereUniqueWithoutRundownInputSchema;
