import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MediaOrderByWithRelationInputSchema } from './MediaOrderByWithRelationInputSchema';
import { RundownOrderByWithRelationInputSchema } from './RundownOrderByWithRelationInputSchema';

export const RundownItemOrderByWithRelationInputSchema: z.ZodType<Prisma.RundownItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rundownId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
  rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional()
}).strict();

export default RundownItemOrderByWithRelationInputSchema;
