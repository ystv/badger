import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { EnumConnectionTargetFieldUpdateOperationsInputSchema } from './EnumConnectionTargetFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutConnectionsNestedInputSchema } from './UserUpdateOneRequiredWithoutConnectionsNestedInputSchema';

export const ConnectionUpdateInputSchema: z.ZodType<Prisma.ConnectionUpdateInput> = z.object({
  target: z.union([ z.lazy(() => ConnectionTargetSchema),z.lazy(() => EnumConnectionTargetFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConnectionsNestedInputSchema).optional()
}).strict();

export default ConnectionUpdateInputSchema;
