import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { MediaOrderByWithRelationInputSchema } from "./MediaOrderByWithRelationInputSchema";
import { BaseJobOrderByWithRelationInputSchema } from "./BaseJobOrderByWithRelationInputSchema";

export const ProcessMediaJobOrderByWithRelationInputSchema: z.ZodType<Prisma.ProcessMediaJobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      mediaId: z.lazy(() => SortOrderSchema).optional(),
      sourceType: z.lazy(() => SortOrderSchema).optional(),
      source: z.lazy(() => SortOrderSchema).optional(),
      base_job_id: z.lazy(() => SortOrderSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      base_job: z.lazy(() => BaseJobOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export default ProcessMediaJobOrderByWithRelationInputSchema;
