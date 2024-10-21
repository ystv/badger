import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutMediaInputSchema } from './MetadataUpdateWithoutMediaInputSchema';
import { MetadataUncheckedUpdateWithoutMediaInputSchema } from './MetadataUncheckedUpdateWithoutMediaInputSchema';
import { MetadataCreateWithoutMediaInputSchema } from './MetadataCreateWithoutMediaInputSchema';
import { MetadataUncheckedCreateWithoutMediaInputSchema } from './MetadataUncheckedCreateWithoutMediaInputSchema';

export const MetadataUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MetadataUpdateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => MetadataCreateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default MetadataUpsertWithWhereUniqueWithoutMediaInputSchema;
