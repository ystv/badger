import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"
import { RundownItemFindManyArgsSchema } from "../outputTypeSchemas/RundownItemFindManyArgsSchema"
import { AssetFindManyArgsSchema } from "../outputTypeSchemas/AssetFindManyArgsSchema"
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { RundownCountOutputTypeArgsSchema } from "../outputTypeSchemas/RundownCountOutputTypeArgsSchema"

export const RundownIncludeSchema: z.ZodType<Prisma.RundownInclude> = z.object({
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
  items: z.union([z.boolean(),z.lazy(() => RundownItemFindManyArgsSchema)]).optional(),
  assets: z.union([z.boolean(),z.lazy(() => AssetFindManyArgsSchema)]).optional(),
  metadata: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RundownCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default RundownIncludeSchema;
