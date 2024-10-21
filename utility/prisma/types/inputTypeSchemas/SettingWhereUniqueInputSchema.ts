import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { SettingWhereInputSchema } from './SettingWhereInputSchema';
import { JsonFilterSchema } from './JsonFilterSchema';

export const SettingWhereUniqueInputSchema: z.ZodType<Prisma.SettingWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    key: z.lazy(() => SettingKeySchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    key: z.lazy(() => SettingKeySchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  key: z.lazy(() => SettingKeySchema).optional(),
  AND: z.union([ z.lazy(() => SettingWhereInputSchema),z.lazy(() => SettingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SettingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SettingWhereInputSchema),z.lazy(() => SettingWhereInputSchema).array() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional()
}).strict());

export default SettingWhereUniqueInputSchema;
