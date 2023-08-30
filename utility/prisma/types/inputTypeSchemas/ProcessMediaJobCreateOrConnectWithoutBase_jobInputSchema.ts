import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema";

export const ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateOrConnectWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProcessMediaJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema;
