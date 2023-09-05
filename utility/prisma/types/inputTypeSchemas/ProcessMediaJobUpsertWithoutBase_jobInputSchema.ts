import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUpdateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema";
import { ProcessMediaJobCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";

export const ProcessMediaJobUpsertWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobUpsertWithoutBase_jobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProcessMediaJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProcessMediaJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
      where: z.lazy(() => ProcessMediaJobWhereInputSchema).optional(),
    })
    .strict();

export default ProcessMediaJobUpsertWithoutBase_jobInputSchema;
