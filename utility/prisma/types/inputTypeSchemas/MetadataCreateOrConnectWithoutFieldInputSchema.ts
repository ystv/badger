import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataCreateWithoutFieldInputSchema } from './MetadataCreateWithoutFieldInputSchema';
import { MetadataUncheckedCreateWithoutFieldInputSchema } from './MetadataUncheckedCreateWithoutFieldInputSchema';

export const MetadataCreateOrConnectWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateOrConnectWithoutFieldInput> = z.object({
  where: z.lazy(() => MetadataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetadataCreateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema) ]),
}).strict();

export default MetadataCreateOrConnectWithoutFieldInputSchema;
