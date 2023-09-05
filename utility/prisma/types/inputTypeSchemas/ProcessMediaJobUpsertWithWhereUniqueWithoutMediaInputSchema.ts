import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobUpdateWithoutMediaInputSchema } from "./ProcessMediaJobUpdateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema";
import { ProcessMediaJobCreateWithoutMediaInputSchema } from "./ProcessMediaJobCreateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutMediaInputSchema";

export const ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ProcessMediaJobUpdateWithoutMediaInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema;
