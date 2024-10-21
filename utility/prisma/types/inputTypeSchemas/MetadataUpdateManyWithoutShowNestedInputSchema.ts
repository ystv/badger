import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutShowInputSchema } from './MetadataCreateWithoutShowInputSchema';
import { MetadataUncheckedCreateWithoutShowInputSchema } from './MetadataUncheckedCreateWithoutShowInputSchema';
import { MetadataCreateOrConnectWithoutShowInputSchema } from './MetadataCreateOrConnectWithoutShowInputSchema';
import { MetadataUpsertWithWhereUniqueWithoutShowInputSchema } from './MetadataUpsertWithWhereUniqueWithoutShowInputSchema';
import { MetadataCreateManyShowInputEnvelopeSchema } from './MetadataCreateManyShowInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithWhereUniqueWithoutShowInputSchema } from './MetadataUpdateWithWhereUniqueWithoutShowInputSchema';
import { MetadataUpdateManyWithWhereWithoutShowInputSchema } from './MetadataUpdateManyWithWhereWithoutShowInputSchema';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';

export const MetadataUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutShowInputSchema),z.lazy(() => MetadataCreateWithoutShowInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => MetadataUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => MetadataUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => MetadataUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MetadataUpdateManyWithoutShowNestedInputSchema;
