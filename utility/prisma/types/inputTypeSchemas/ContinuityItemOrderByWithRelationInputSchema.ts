import type { Prisma } from "../../client";
import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { MediaOrderByWithRelationInputSchema } from "./MediaOrderByWithRelationInputSchema";
import { ShowOrderByWithRelationInputSchema } from "./ShowOrderByWithRelationInputSchema";

export const ContinuityItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ContinuityItemOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      order: z.lazy(() => SortOrderSchema).optional(),
      showId: z.lazy(() => SortOrderSchema).optional(),
      durationSeconds: z.lazy(() => SortOrderSchema).optional(),
      media: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
      show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export default ContinuityItemOrderByWithRelationInputSchema;
