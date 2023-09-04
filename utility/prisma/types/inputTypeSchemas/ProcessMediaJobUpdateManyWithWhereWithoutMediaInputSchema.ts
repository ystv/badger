import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobScalarWhereInputSchema } from "./ProcessMediaJobScalarWhereInputSchema";
import { ProcessMediaJobUpdateManyMutationInputSchema } from "./ProcessMediaJobUpdateManyMutationInputSchema";
import { ProcessMediaJobUncheckedUpdateManyWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedUpdateManyWithoutMediaInputSchema";

export const ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUpdateManyWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ProcessMediaJobUpdateManyMutationInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedUpdateManyWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema;
