import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MediaOrderByWithRelationInputSchema } from './MediaOrderByWithRelationInputSchema';

export const MediaProcessingTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  media_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  additionalInfo: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional()
}).strict();

export default MediaProcessingTaskOrderByWithRelationInputSchema;
