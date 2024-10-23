import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateWithoutFieldInputSchema } from './MetadataCreateWithoutFieldInputSchema';
import { MetadataUncheckedCreateWithoutFieldInputSchema } from './MetadataUncheckedCreateWithoutFieldInputSchema';
import { MetadataCreateOrConnectWithoutFieldInputSchema } from './MetadataCreateOrConnectWithoutFieldInputSchema';
import { MetadataUpsertWithWhereUniqueWithoutFieldInputSchema } from './MetadataUpsertWithWhereUniqueWithoutFieldInputSchema';
import { MetadataCreateManyFieldInputEnvelopeSchema } from './MetadataCreateManyFieldInputEnvelopeSchema';
import { MetadataWhereUniqueInputSchema } from './MetadataWhereUniqueInputSchema';
import { MetadataUpdateWithWhereUniqueWithoutFieldInputSchema } from './MetadataUpdateWithWhereUniqueWithoutFieldInputSchema';
import { MetadataUpdateManyWithWhereWithoutFieldInputSchema } from './MetadataUpdateManyWithWhereWithoutFieldInputSchema';
import { MetadataScalarWhereInputSchema } from './MetadataScalarWhereInputSchema';

export const MetadataUpdateManyWithoutFieldNestedInputSchema: z.ZodType<Prisma.MetadataUpdateManyWithoutFieldNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetadataCreateWithoutFieldInputSchema),z.lazy(() => MetadataCreateWithoutFieldInputSchema).array(),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema),z.lazy(() => MetadataUncheckedCreateWithoutFieldInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema),z.lazy(() => MetadataCreateOrConnectWithoutFieldInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema),z.lazy(() => MetadataUpsertWithWhereUniqueWithoutFieldInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetadataCreateManyFieldInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetadataWhereUniqueInputSchema),z.lazy(() => MetadataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema),z.lazy(() => MetadataUpdateWithWhereUniqueWithoutFieldInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema),z.lazy(() => MetadataUpdateManyWithWhereWithoutFieldInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MetadataUpdateManyWithoutFieldNestedInputSchema;
