import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema";
import { ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateOrConnectWithoutBase_jobInputSchema";
import { ProcessMediaJobUpsertWithoutBase_jobInputSchema } from "./ProcessMediaJobUpsertWithoutBase_jobInputSchema";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInputSchema } from "./ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInputSchema";
import { ProcessMediaJobUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUpdateWithoutBase_jobInputSchema";
import { ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema";

export const ProcessMediaJobUncheckedUpdateOneWithoutBase_jobNestedInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedUpdateOneWithoutBase_jobNestedInput> =
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
      upsert: z
        .lazy(() => ProcessMediaJobUpsertWithoutBase_jobInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => ProcessMediaJobWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => ProcessMediaJobWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ProcessMediaJobUpdateToOneWithWhereWithoutBase_jobInputSchema,
          ),
          z.lazy(() => ProcessMediaJobUpdateWithoutBase_jobInputSchema),
          z.lazy(
            () => ProcessMediaJobUncheckedUpdateWithoutBase_jobInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export default ProcessMediaJobUncheckedUpdateOneWithoutBase_jobNestedInputSchema;
