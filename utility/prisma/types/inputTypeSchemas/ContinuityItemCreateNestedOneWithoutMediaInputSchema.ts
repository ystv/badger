import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemCreateWithoutMediaInputSchema } from "./ContinuityItemCreateWithoutMediaInputSchema";
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from "./ContinuityItemUncheckedCreateWithoutMediaInputSchema";
import { ContinuityItemCreateOrConnectWithoutMediaInputSchema } from "./ContinuityItemCreateOrConnectWithoutMediaInputSchema";
import { ContinuityItemWhereUniqueInputSchema } from "./ContinuityItemWhereUniqueInputSchema";

export const ContinuityItemCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateNestedOneWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      connect: z.lazy(() => ContinuityItemWhereUniqueInputSchema).optional(),
    })
    .strict();

export default ContinuityItemCreateNestedOneWithoutMediaInputSchema;
