import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutMediaInputSchema } from './MetadataCreateWithoutMediaInputSchema';
import { MetadataUncheckedCreateWithoutMediaInputSchema } from './MetadataUncheckedCreateWithoutMediaInputSchema';
import { MetadataCreateOrConnectWithoutMediaInputSchema } from './MetadataCreateOrConnectWithoutMediaInputSchema';
import { MetadataUpsertWithWhereUniqueWithoutMediaInputSchema } from './MetadataUpsertWithWhereUniqueWithoutMediaInputSchema';
import { MetadataCreateManyMediaInputEnvelopeSchema } from './MetadataCreateManyMediaInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithWhereUniqueWithoutMediaInputSchema } from './MetadataUpdateWithWhereUniqueWithoutMediaInputSchema';
import { MetadataUpdateManyWithWhereWithoutMediaInputSchema } from './MetadataUpdateManyWithWhereWithoutMediaInputSchema';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';

export const MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MetadataUncheckedUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutMediaInputSchema),z.lazy(() => MetadataCreateWithoutMediaInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => MetadataUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyMediaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => MetadataUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => MetadataUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema;
