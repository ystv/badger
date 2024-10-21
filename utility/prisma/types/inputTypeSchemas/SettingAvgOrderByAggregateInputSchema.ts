import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SettingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SettingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SettingAvgOrderByAggregateInputSchema;
