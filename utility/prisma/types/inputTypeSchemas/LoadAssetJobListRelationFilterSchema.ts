import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";

export const LoadAssetJobListRelationFilterSchema: z.ZodType<Prisma.LoadAssetJobListRelationFilter> =
  z
    .object({
      every: z.lazy(() => LoadAssetJobWhereInputSchema).optional(),
      some: z.lazy(() => LoadAssetJobWhereInputSchema).optional(),
      none: z.lazy(() => LoadAssetJobWhereInputSchema).optional(),
    })
    .strict();

export default LoadAssetJobListRelationFilterSchema;
