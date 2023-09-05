import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobWhereUniqueInputSchema } from "../inputTypeSchemas/DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobCreateInputSchema } from "../inputTypeSchemas/DummyTestJobCreateInputSchema";
import { DummyTestJobUncheckedCreateInputSchema } from "../inputTypeSchemas/DummyTestJobUncheckedCreateInputSchema";
import { DummyTestJobUpdateInputSchema } from "../inputTypeSchemas/DummyTestJobUpdateInputSchema";
import { DummyTestJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/DummyTestJobUncheckedUpdateInputSchema";

export const DummyTestJobUpsertArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobUpsertArgs, "select" | "include">
> = z
  .object({
    where: DummyTestJobWhereUniqueInputSchema,
    create: z.union([
      DummyTestJobCreateInputSchema,
      DummyTestJobUncheckedCreateInputSchema,
    ]),
    update: z.union([
      DummyTestJobUpdateInputSchema,
      DummyTestJobUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export default DummyTestJobUpsertArgsSchema;
