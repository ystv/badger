import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobUpdateWithoutMediaInputSchema } from "./ProcessMediaJobUpdateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema";

export const ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ProcessMediaJobUpdateWithoutMediaInputSchema),
        z.lazy(() => ProcessMediaJobUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema;
