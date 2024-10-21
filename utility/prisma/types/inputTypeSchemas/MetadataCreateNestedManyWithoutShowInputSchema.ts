import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutShowInputSchema } from './MetadataCreateWithoutShowInputSchema';
import { MetadataUncheckedCreateWithoutShowInputSchema } from './MetadataUncheckedCreateWithoutShowInputSchema';
import { MetadataCreateOrConnectWithoutShowInputSchema } from './MetadataCreateOrConnectWithoutShowInputSchema';
import { MetadataCreateManyShowInputEnvelopeSchema } from './MetadataCreateManyShowInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';

export const MetadataCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutShowInputSchema),z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MetadataCreateNestedManyWithoutShowInputSchema;
