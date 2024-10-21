import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { UserCreateNestedOneWithoutConnectionsInputSchema } from './UserCreateNestedOneWithoutConnectionsInputSchema';

export const ConnectionCreateInputSchema: z.ZodType<Prisma.ConnectionCreateInput> = z.object({
  target: z.lazy(() => ConnectionTargetSchema),
  refreshToken: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutConnectionsInputSchema)
}).strict();

export default ConnectionCreateInputSchema;
