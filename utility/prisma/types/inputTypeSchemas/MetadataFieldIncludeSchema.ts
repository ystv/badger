import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { MetadataFieldCountOutputTypeArgsSchema } from "../outputTypeSchemas/MetadataFieldCountOutputTypeArgsSchema"

export const MetadataFieldIncludeSchema: z.ZodType<Prisma.MetadataFieldInclude> = z.object({
  values: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MetadataFieldCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MetadataFieldIncludeSchema;
