import { z } from "zod";
import type { Prisma } from "../../client";
import { DummyTestJobCreateInputSchema } from "../inputTypeSchemas/DummyTestJobCreateInputSchema";
import { DummyTestJobUncheckedCreateInputSchema } from "../inputTypeSchemas/DummyTestJobUncheckedCreateInputSchema";

export const DummyTestJobCreateArgsSchema: z.ZodType<
  Omit<Prisma.DummyTestJobCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      DummyTestJobCreateInputSchema,
      DummyTestJobUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export default DummyTestJobCreateArgsSchema;
