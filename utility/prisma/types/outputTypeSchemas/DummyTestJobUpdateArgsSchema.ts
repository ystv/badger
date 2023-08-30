import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobUpdateInputSchema } from "../inputTypeSchemas/DummyTestJobUpdateInputSchema";
import { DummyTestJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/DummyTestJobUncheckedUpdateInputSchema";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobUpdateArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      DummyTestJobUpdateInputSchema,
      DummyTestJobUncheckedUpdateInputSchema,
    ]),
    where: DummyTestJobWhereUniqueInputSchema,
  })
  .strict();

export default DummyTestJobUpdateArgsSchema;
