import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutRundownInputSchema } from './MetadataCreateWithoutRundownInputSchema';
import { MetadataUncheckedCreateWithoutRundownInputSchema } from './MetadataUncheckedCreateWithoutRundownInputSchema';
import { MetadataCreateOrConnectWithoutRundownInputSchema } from './MetadataCreateOrConnectWithoutRundownInputSchema';
import { MetadataCreateManyRundownInputEnvelopeSchema } from './MetadataCreateManyRundownInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';

export const MetadataCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutRundownInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutRundownInputSchema),z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyRundownInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MetadataCreateNestedManyWithoutRundownInputSchema;
