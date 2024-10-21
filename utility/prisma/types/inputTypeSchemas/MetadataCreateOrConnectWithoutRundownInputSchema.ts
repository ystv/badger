import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataCreateWithoutRundownInputSchema } from './MetadataCreateWithoutRundownInputSchema';
import { MetadataUncheckedCreateWithoutRundownInputSchema } from './MetadataUncheckedCreateWithoutRundownInputSchema';

export const MetadataCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutRundownInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetadataCreateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default MetadataCreateOrConnectWithoutRundownInputSchema;
