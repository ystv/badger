import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateNestedOneWithoutDummyTestJobInputSchema } from "./BaseJobCreateNestedOneWithoutDummyTestJobInputSchema";

export const DummyTestJobCreateInputSchema: z.ZodType<Prisma.DummyTestJobCreateInput> =
  z
    .object({
      base_job: z.lazy(
        () => BaseJobCreateNestedOneWithoutDummyTestJobInputSchema,
      ),
    })
    .strict();

export default DummyTestJobCreateInputSchema;
