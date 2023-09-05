import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobCreateNestedOneWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateNestedOneWithoutBase_jobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProcessMediaJobCreateWithoutBase_jobInputSchema),
          z.lazy(
            () => ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema)
        .optional(),
      connect: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default ProcessMediaJobCreateNestedOneWithoutBase_jobInputSchema;
