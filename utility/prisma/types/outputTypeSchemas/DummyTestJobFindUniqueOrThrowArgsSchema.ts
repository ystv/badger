import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: DummyTestJobWhereUniqueInputSchema,
  })
  .strict();

export default DummyTestJobFindUniqueOrThrowArgsSchema;
