import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereInputSchema } from "../inputTypeSchemas/DummyTestJobWhereInputSchema";

export const DummyTestJobDeleteManyArgsSchema: z.ZodType<Prisma.DummyTestJobDeleteManyArgs> =
  z
    .object({
      where: DummyTestJobWhereInputSchema.optional(),
    })
    .strict();

export default DummyTestJobDeleteManyArgsSchema;
