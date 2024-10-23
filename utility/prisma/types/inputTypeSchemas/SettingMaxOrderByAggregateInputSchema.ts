import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SettingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SettingMaxOrderByAggregateInputSchema;
