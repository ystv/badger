import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { MetadataFieldCountOutputTypeArgsSchema } from "../outputTypeSchemas/MetadataFieldCountOutputTypeArgsSchema"

export const MetadataFieldSelectSchema: z.ZodType<Prisma.MetadataFieldSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  type: z.boolean().optional(),
  target: z.boolean().optional(),
  archived: z.boolean().optional(),
  default: z.boolean().optional(),
  values: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MetadataFieldCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MetadataFieldSelectSchema;
