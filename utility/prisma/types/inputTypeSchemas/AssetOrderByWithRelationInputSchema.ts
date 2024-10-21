import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MediaOrderByWithRelationInputSchema } from './MediaOrderByWithRelationInputSchema';
import { RundownOrderByWithRelationInputSchema } from './RundownOrderByWithRelationInputSchema';

export const AssetOrderByWithRelationInputSchema: z.ZodType<Prisma.AssetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  rundownId: z.lazy(() => SortOrderSchema).optional(),
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
  rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional()
}).strict();

export default AssetOrderByWithRelationInputSchema;
