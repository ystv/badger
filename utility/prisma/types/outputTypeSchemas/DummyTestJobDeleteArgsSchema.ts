import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobDeleteArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobDeleteArgs, "select" | "include">
> = z
  .object({
    where: DummyTestJobWhereUniqueInputSchema,
  })
  .strict();

export default DummyTestJobDeleteArgsSchema;
