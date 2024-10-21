import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema } from './UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema';

export const IdentityUpdateInputSchema: z.ZodType<Prisma.IdentityUpdateInput> = z.object({
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identityID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema).optional()
}).strict();

export default IdentityUpdateInputSchema;
