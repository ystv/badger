import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobCreateInputSchema } from "../inputTypeSchemas/ProcessMediaJobCreateInputSchema";
import { ProcessMediaJobUncheckedCreateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUncheckedCreateInputSchema";
import { ProcessMediaJobUpdateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUpdateInputSchema";
import { ProcessMediaJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUncheckedUpdateInputSchema";

export const ProcessMediaJobUpsertArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobUpsertArgs, "select" | "include">
> = z
  .object({
    where: ProcessMediaJobWhereUniqueInputSchema,
    create: z.union([
      ProcessMediaJobCreateInputSchema,
      ProcessMediaJobUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ProcessMediaJobUpdateInputSchema,
      ProcessMediaJobUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export default ProcessMediaJobUpsertArgsSchema;
