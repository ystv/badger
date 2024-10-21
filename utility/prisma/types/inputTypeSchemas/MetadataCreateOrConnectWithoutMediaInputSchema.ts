import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataCreateWithoutMediaInputSchema } from './MetadataCreateWithoutMediaInputSchema';
import { MetadataUncheckedCreateWithoutMediaInputSchema } from './MetadataUncheckedCreateWithoutMediaInputSchema';

export const MetadataCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetadataCreateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default MetadataCreateOrConnectWithoutMediaInputSchema;
