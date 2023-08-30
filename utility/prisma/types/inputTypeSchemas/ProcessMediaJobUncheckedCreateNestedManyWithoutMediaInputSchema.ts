import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobCreateWithoutMediaInputSchema } from "./ProcessMediaJobCreateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutMediaInputSchema";
import { ProcessMediaJobCreateOrConnectWithoutMediaInputSchema } from "./ProcessMediaJobCreateOrConnectWithoutMediaInputSchema";
import { ProcessMediaJobCreateManyMediaInputEnvelopeSchema } from "./ProcessMediaJobCreateManyMediaInputEnvelopeSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema),
          z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProcessMediaJobCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ProcessMediaJobCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ProcessMediaJobCreateManyMediaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema;
