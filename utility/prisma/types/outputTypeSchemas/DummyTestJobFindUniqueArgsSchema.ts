import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: DummyTestJobWhereUniqueInputSchema,
  })
  .strict();

export default DummyTestJobFindUniqueArgsSchema;
