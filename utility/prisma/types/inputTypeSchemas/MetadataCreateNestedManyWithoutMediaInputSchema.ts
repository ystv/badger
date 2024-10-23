import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutMediaInputSchema } from './MetadataCreateWithoutMediaInputSchema';
import { MetadataUncheckedCreateWithoutMediaInputSchema } from './MetadataUncheckedCreateWithoutMediaInputSchema';
import { MetadataCreateOrConnectWithoutMediaInputSchema } from './MetadataCreateOrConnectWithoutMediaInputSchema';
import { MetadataCreateManyMediaInputEnvelopeSchema } from './MetadataCreateManyMediaInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';

export const MetadataCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutMediaInputSchema),z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyMediaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MetadataCreateNestedManyWithoutMediaInputSchema;
