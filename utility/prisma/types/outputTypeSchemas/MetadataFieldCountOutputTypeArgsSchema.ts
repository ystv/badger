import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldCountOutputTypeSelectSchema } from './MetadataFieldCountOutputTypeSelectSchema';

export const MetadataFieldCountOutputTypeArgsSchema: z.ZodType<Prisma.MetadataFieldCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MetadataFieldCountOutputTypeSelectSchema).nullish(),
}).strict();

export default MetadataFieldCountOutputTypeSelectSchema;
