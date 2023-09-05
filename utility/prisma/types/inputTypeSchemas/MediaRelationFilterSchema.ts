import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaRelationFilterSchema: z.ZodType<Prisma.MediaRelationFilter> =
  z
    .object({
      is: z.lazy(() => MediaWhereInputSchema).optional(),
      isNot: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export default MediaRelationFilterSchema;
