import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";

export const DummyTestJobListRelationFilterSchema: z.ZodType<Prisma.DummyTestJobListRelationFilter> =
  z
    .object({
      every: z.lazy(() => DummyTestJobWhereInputSchema).optional(),
      some: z.lazy(() => DummyTestJobWhereInputSchema).optional(),
      none: z.lazy(() => DummyTestJobWhereInputSchema).optional(),
    })
    .strict();

export default DummyTestJobListRelationFilterSchema;
