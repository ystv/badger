import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";
import { ProcessMediaJobUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUpdateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema";

export const ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProcessMediaJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInputSchema;
