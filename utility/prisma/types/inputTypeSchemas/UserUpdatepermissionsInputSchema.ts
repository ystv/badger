import type { Prisma } from '../../client';

import { z } from 'zod';
import { PermissionSchema } from './PermissionSchema';

export const UserUpdatepermissionsInputSchema: z.ZodType<Prisma.UserUpdatepermissionsInput> = z.object({
  set: z.lazy(() => PermissionSchema).array().optional(),
  push: z.union([ z.lazy(() => PermissionSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
}).strict();

export default UserUpdatepermissionsInputSchema;
