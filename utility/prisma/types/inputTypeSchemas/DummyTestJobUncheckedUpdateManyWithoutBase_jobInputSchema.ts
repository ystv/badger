import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";

export const DummyTestJobUncheckedUpdateManyWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedUpdateManyWithoutBase_jobInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default DummyTestJobUncheckedUpdateManyWithoutBase_jobInputSchema;
