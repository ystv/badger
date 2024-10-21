import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutFieldInputSchema } from './MetadataCreateWithoutFieldInputSchema';
import { MetadataUncheckedCreateWithoutFieldInputSchema } from './MetadataUncheckedCreateWithoutFieldInputSchema';
import { MetadataCreateOrConnectWithoutFieldInputSchema } from './MetadataCreateOrConnectWithoutFieldInputSchema';
import { MetadataCreateManyFieldInputEnvelopeSchema } from './MetadataCreateManyFieldInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';

export const MetadataUncheckedCreateNestedManyWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateNestedManyWithoutFieldInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutFieldInputSchema),z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyFieldInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MetadataUncheckedCreateNestedManyWithoutFieldInputSchema;
