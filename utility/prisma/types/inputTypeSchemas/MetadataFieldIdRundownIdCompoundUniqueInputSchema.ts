import type { Prisma } from '../../client';

import { z } from 'zod';

export const MetadataFieldIdRundownIdCompoundUniqueInputSchema: z.ZodType<Prisma.MetadataFieldIdRundownIdCompoundUniqueInput> = z.object({
  fieldId: z.number(),
  rundownId: z.number()
}).strict();

export default MetadataFieldIdRundownIdCompoundUniqueInputSchema;
