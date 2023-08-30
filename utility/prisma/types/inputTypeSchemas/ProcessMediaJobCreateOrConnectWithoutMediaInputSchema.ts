import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobCreateWithoutMediaInputSchema } from "./ProcessMediaJobCreateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutMediaInputSchema";

export const ProcessMediaJobCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobCreateOrConnectWithoutMediaInputSchema;
