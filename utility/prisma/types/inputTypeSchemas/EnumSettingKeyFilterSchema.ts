import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { NestedEnumSettingKeyFilterSchema } from './NestedEnumSettingKeyFilterSchema';

export const EnumSettingKeyFilterSchema: z.ZodType<Prisma.EnumSettingKeyFilter> = z.object({
  equals: z.lazy(() => SettingKeySchema).optional(),
  in: z.lazy(() => SettingKeySchema).array().optional(),
  notIn: z.lazy(() => SettingKeySchema).array().optional(),
  not: z.union([ z.lazy(() => SettingKeySchema),z.lazy(() => NestedEnumSettingKeyFilterSchema) ]).optional(),
}).strict();

export default EnumSettingKeyFilterSchema;
