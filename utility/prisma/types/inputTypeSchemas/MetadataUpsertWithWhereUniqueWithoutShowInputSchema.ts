import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithoutShowInputSchema } from './MetadataUpdateWithoutShowInputSchema';
import { MetadataUncheckedUpdateWithoutShowInputSchema } from './MetadataUncheckedUpdateWithoutShowInputSchema';
import { MetadataCreateWithoutShowInputSchema } from './MetadataCreateWithoutShowInputSchema';
import { MetadataUncheckedCreateWithoutShowInputSchema } from './MetadataUncheckedCreateWithoutShowInputSchema';

export const MetadataUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MetadataUpdateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => MetadataCreateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default MetadataUpsertWithWhereUniqueWithoutShowInputSchema;
