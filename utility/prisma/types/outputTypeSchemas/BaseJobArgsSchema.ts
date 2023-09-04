import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobSelectSchema } from "../inputTypeSchemas/BaseJobSelectSchema";
import { BaseJobIncludeSchema } from "../inputTypeSchemas/BaseJobIncludeSchema";

export const BaseJobArgsSchema: z.ZodType<Prisma.BaseJobDefaultArgs> = z
  .object({
    select: z.lazy(() => BaseJobSelectSchema).optional(),
    include: z.lazy(() => BaseJobIncludeSchema).optional(),
  })
  .strict();

export default BaseJobArgsSchema;
