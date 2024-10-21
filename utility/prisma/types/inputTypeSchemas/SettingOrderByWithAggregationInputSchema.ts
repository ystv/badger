import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SettingCountOrderByAggregateInputSchema } from './SettingCountOrderByAggregateInputSchema';
import { SettingAvgOrderByAggregateInputSchema } from './SettingAvgOrderByAggregateInputSchema';
import { SettingMaxOrderByAggregateInputSchema } from './SettingMaxOrderByAggregateInputSchema';
import { SettingMinOrderByAggregateInputSchema } from './SettingMinOrderByAggregateInputSchema';
import { SettingSumOrderByAggregateInputSchema } from './SettingSumOrderByAggregateInputSchema';

export const SettingOrderByWithAggregationInputSchema: z.ZodType<Prisma.SettingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SettingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SettingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SettingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SettingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SettingSumOrderByAggregateInputSchema).optional()
}).strict();

export default SettingOrderByWithAggregationInputSchema;
