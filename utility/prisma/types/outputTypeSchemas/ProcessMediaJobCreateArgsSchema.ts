import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobCreateInputSchema } from "../inputTypeSchemas/ProcessMediaJobCreateInputSchema";
import { ProcessMediaJobUncheckedCreateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUncheckedCreateInputSchema";

export const ProcessMediaJobCreateArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ProcessMediaJobCreateInputSchema,
      ProcessMediaJobUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export default ProcessMediaJobCreateArgsSchema;
