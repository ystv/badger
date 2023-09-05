import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInputSchema } from "./BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInputSchema";

export const DummyTestJobUpdateInputSchema: z.ZodType<Prisma.DummyTestJobUpdateInput> =
  z
    .object({
      base_job: z
        .lazy(
          () => BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default DummyTestJobUpdateInputSchema;
