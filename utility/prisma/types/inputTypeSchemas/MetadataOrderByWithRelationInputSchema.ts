import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MetadataFieldOrderByWithRelationInputSchema } from './MetadataFieldOrderByWithRelationInputSchema';
import { ShowOrderByWithRelationInputSchema } from './ShowOrderByWithRelationInputSchema';
import { RundownOrderByWithRelationInputSchema } from './RundownOrderByWithRelationInputSchema';
import { MediaOrderByWithRelationInputSchema } from './MediaOrderByWithRelationInputSchema';

export const MetadataOrderByWithRelationInputSchema: z.ZodType<Prisma.MetadataOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  fieldId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rundownId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  field: z.lazy(() => MetadataFieldOrderByWithRelationInputSchema).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  rundown: z.lazy(() => RundownOrderByWithRelationInputSchema).optional(),
  media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional()
}).strict();

export default MetadataOrderByWithRelationInputSchema;
