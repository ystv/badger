import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobUpdateManyMutationInputSchema } from "../inputTypeSchemas/DummyTestJobUpdateManyMutationInputSchema";
import { DummyTestJobUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/DummyTestJobUncheckedUpdateManyInputSchema";
import { DummyTestJobWhereInputSchema } from "../inputTypeSchemas/DummyTestJobWhereInputSchema";

export const DummyTestJobUpdateManyArgsSchema: z.ZodType<Prisma.DummyTestJobUpdateManyArgs> =
  z
    .object({
      data: z.union([
        DummyTestJobUpdateManyMutationInputSchema,
        DummyTestJobUncheckedUpdateManyInputSchema,
      ]),
      where: DummyTestJobWhereInputSchema.optional(),
    })
    .strict();

export default DummyTestJobUpdateManyArgsSchema;
