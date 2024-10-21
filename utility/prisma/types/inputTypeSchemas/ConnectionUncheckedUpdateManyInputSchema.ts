import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { EnumConnectionTargetFieldUpdateOperationsInputSchema } from './EnumConnectionTargetFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const ConnectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.lazy(() => ConnectionTargetSchema),z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default ConnectionUncheckedUpdateManyInputSchema;
