import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataCreateWithoutShowInputSchema } from './MetadataCreateWithoutShowInputSchema';
import { MetadataUncheckedCreateWithoutShowInputSchema } from './MetadataUncheckedCreateWithoutShowInputSchema';

export const MetadataCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetadataCreateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default MetadataCreateOrConnectWithoutShowInputSchema;
