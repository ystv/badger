import type { Prisma } from '../../client';

import { z } from 'zod';
import { PermissionSchema } from './PermissionSchema';

export const EnumPermissionNullableListFilterSchema: z.ZodType<Prisma.EnumPermissionNullableListFilter> = z.object({
  equals: z.lazy(() => PermissionSchema).array().optional().nullable(),
  has: z.lazy(() => PermissionSchema).optional().nullable(),
  hasEvery: z.lazy(() => PermissionSchema).array().optional(),
  hasSome: z.lazy(() => PermissionSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export default EnumPermissionNullableListFilterSchema;
