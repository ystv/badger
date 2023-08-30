import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobCountOutputTypeSelectSchema } from "./BaseJobCountOutputTypeSelectSchema";

export const BaseJobCountOutputTypeArgsSchema: z.ZodType<Prisma.BaseJobCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => BaseJobCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export default BaseJobCountOutputTypeSelectSchema;
