import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutRundownInputSchema } from './MetadataCreateWithoutRundownInputSchema';
import { MetadataUncheckedCreateWithoutRundownInputSchema } from './MetadataUncheckedCreateWithoutRundownInputSchema';
import { MetadataCreateOrConnectWithoutRundownInputSchema } from './MetadataCreateOrConnectWithoutRundownInputSchema';
import { MetadataUpsertWithWhereUniqueWithoutRundownInputSchema } from './MetadataUpsertWithWhereUniqueWithoutRundownInputSchema';
import { MetadataCreateManyRundownInputEnvelopeSchema } from './MetadataCreateManyRundownInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithWhereUniqueWithoutRundownInputSchema } from './MetadataUpdateWithWhereUniqueWithoutRundownInputSchema';
import { MetadataUpdateManyWithWhereWithoutRundownInputSchema } from './MetadataUpdateManyWithWhereWithoutRundownInputSchema';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';

export const MetadataUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutRundownNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutRundownInputSchema),z.lazy(() => MetadataCreateWithoutRundownInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => MetadataUpsertWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyRundownInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => MetadataUpdateWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema),z.lazy(() => MetadataUpdateManyWithWhereWithoutRundownInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MetadataUpdateManyWithoutRundownNestedInputSchema;
