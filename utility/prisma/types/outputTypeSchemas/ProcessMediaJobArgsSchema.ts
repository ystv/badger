import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobSelectSchema } from "../inputTypeSchemas/ProcessMediaJobSelectSchema";
import { ProcessMediaJobIncludeSchema } from "../inputTypeSchemas/ProcessMediaJobIncludeSchema";

export const ProcessMediaJobArgsSchema: z.ZodType<Prisma.ProcessMediaJobDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ProcessMediaJobSelectSchema).optional(),
      include: z.lazy(() => ProcessMediaJobIncludeSchema).optional(),
    })
    .strict();

export default ProcessMediaJobArgsSchema;
