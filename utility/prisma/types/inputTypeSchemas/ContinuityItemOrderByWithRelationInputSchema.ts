import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MediaOrderByWithRelationInputSchema } from './MediaOrderByWithRelationInputSchema';
import { ShowOrderByWithRelationInputSchema } from './ShowOrderByWithRelationInputSchema';

export const ContinuityItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ContinuityItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional()
}).strict();

export default ContinuityItemOrderByWithRelationInputSchema;
