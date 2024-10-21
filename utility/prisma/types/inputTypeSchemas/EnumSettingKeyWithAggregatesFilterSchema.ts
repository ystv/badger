import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { NestedEnumSettingKeyWithAggregatesFilterSchema } from './NestedEnumSettingKeyWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSettingKeyFilterSchema } from './NestedEnumSettingKeyFilterSchema';

export const EnumSettingKeyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSettingKeyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SettingKeySchema).optional(),
  in: z.lazy(() => SettingKeySchema).array().optional(),
  notIn: z.lazy(() => SettingKeySchema).array().optional(),
  not: z.union([ z.lazy(() => SettingKeySchema),z.lazy(() => NestedEnumSettingKeyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSettingKeyFilterSchema).optional()
}).strict();

export default EnumSettingKeyWithAggregatesFilterSchema;
