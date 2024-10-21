import type { Prisma } from '../../client';

import { z } from 'zod';
import { PermissionSchema } from './PermissionSchema';

export const UserCreatepermissionsInputSchema: z.ZodType<Prisma.UserCreatepermissionsInput> = z.object({
  set: z.lazy(() => PermissionSchema).array()
}).strict();

export default UserCreatepermissionsInputSchema;
