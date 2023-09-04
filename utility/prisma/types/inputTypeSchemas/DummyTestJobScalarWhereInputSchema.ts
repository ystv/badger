import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";

export const DummyTestJobScalarWhereInputSchema: z.ZodType<Prisma.DummyTestJobScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DummyTestJobScalarWhereInputSchema),
          z.lazy(() => DummyTestJobScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DummyTestJobScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DummyTestJobScalarWhereInputSchema),
          z.lazy(() => DummyTestJobScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      baseJobId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default DummyTestJobScalarWhereInputSchema;
