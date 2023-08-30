import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutRundownItemInputSchema } from "./MediaCreateWithoutRundownItemInputSchema";
import { MediaUncheckedCreateWithoutRundownItemInputSchema } from "./MediaUncheckedCreateWithoutRundownItemInputSchema";
import { MediaCreateOrConnectWithoutRundownItemInputSchema } from "./MediaCreateOrConnectWithoutRundownItemInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";

export const MediaCreateNestedOneWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutRundownItemInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutRundownItemInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutRundownItemInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutRundownItemInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export default MediaCreateNestedOneWithoutRundownItemInputSchema;
