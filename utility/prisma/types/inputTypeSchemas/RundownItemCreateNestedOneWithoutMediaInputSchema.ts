import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemCreateWithoutMediaInputSchema } from "./RundownItemCreateWithoutMediaInputSchema";
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from "./RundownItemUncheckedCreateWithoutMediaInputSchema";
import { RundownItemCreateOrConnectWithoutMediaInputSchema } from "./RundownItemCreateOrConnectWithoutMediaInputSchema";
import { RundownItemWhereUniqueInputSchema } from "./RundownItemWhereUniqueInputSchema";

export const RundownItemCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateNestedOneWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      connect: z.lazy(() => RundownItemWhereUniqueInputSchema).optional(),
    })
    .strict();

export default RundownItemCreateNestedOneWithoutMediaInputSchema;
