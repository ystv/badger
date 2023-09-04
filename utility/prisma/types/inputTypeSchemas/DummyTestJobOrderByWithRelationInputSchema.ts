import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { BaseJobOrderByWithRelationInputSchema } from "./BaseJobOrderByWithRelationInputSchema";

export const DummyTestJobOrderByWithRelationInputSchema: z.ZodType<Prisma.DummyTestJobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      baseJobId: z.lazy(() => SortOrderSchema).optional(),
      base_job: z.lazy(() => BaseJobOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export default DummyTestJobOrderByWithRelationInputSchema;
