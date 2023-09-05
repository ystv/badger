import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobSelectSchema } from "../inputTypeSchemas/DummyTestJobSelectSchema";
import { DummyTestJobIncludeSchema } from "../inputTypeSchemas/DummyTestJobIncludeSchema";

export const DummyTestJobArgsSchema: z.ZodType<Prisma.DummyTestJobDefaultArgs> =
  z
    .object({
      select: z.lazy(() => DummyTestJobSelectSchema).optional(),
      include: z.lazy(() => DummyTestJobIncludeSchema).optional(),
    })
    .strict();

export default DummyTestJobArgsSchema;
