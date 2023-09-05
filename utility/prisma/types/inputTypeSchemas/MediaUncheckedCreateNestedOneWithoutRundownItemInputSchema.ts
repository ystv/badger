import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutRundownItemInputSchema } from "./MediaCreateWithoutRundownItemInputSchema";
import { MediaUncheckedCreateWithoutRundownItemInputSchema } from "./MediaUncheckedCreateWithoutRundownItemInputSchema";
import { MediaCreateOrConnectWithoutRundownItemInputSchema } from "./MediaCreateOrConnectWithoutRundownItemInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";

export const MediaUncheckedCreateNestedOneWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedOneWithoutRundownItemInput> =
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

export default MediaUncheckedCreateNestedOneWithoutRundownItemInputSchema;
