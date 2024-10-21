import { z } from 'zod';
import type { Prisma } from '../../client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  identities: z.boolean().optional(),
  connections: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
