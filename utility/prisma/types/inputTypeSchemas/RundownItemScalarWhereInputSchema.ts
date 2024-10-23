import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumRundownItemTypeFilterSchema } from './EnumRundownItemTypeFilterSchema';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';

export const RundownItemScalarWhereInputSchema: z.ZodType<Prisma.RundownItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RundownItemScalarWhereInputSchema),z.lazy(() => RundownItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RundownItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RundownItemScalarWhereInputSchema),z.lazy(() => RundownItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rundownId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumRundownItemTypeFilterSchema),z.lazy(() => RundownItemTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default RundownItemScalarWhereInputSchema;
