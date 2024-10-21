import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutRundownItemsInputSchema } from './MediaCreateWithoutRundownItemsInputSchema';
import { MediaUncheckedCreateWithoutRundownItemsInputSchema } from './MediaUncheckedCreateWithoutRundownItemsInputSchema';
import { MediaCreateOrConnectWithoutRundownItemsInputSchema } from './MediaCreateOrConnectWithoutRundownItemsInputSchema';
import { MediaUpsertWithoutRundownItemsInputSchema } from './MediaUpsertWithoutRundownItemsInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema } from './MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema';
import { MediaUpdateWithoutRundownItemsInputSchema } from './MediaUpdateWithoutRundownItemsInputSchema';
import { MediaUncheckedUpdateWithoutRundownItemsInputSchema } from './MediaUncheckedUpdateWithoutRundownItemsInputSchema';

export const MediaUpdateOneWithoutRundownItemsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutRundownItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutRundownItemsInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutRundownItemsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema),z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema) ]).optional(),
}).strict();

export default MediaUpdateOneWithoutRundownItemsNestedInputSchema;
