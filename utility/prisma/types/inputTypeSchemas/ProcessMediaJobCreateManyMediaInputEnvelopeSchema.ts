import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobCreateManyMediaInputSchema } from "./ProcessMediaJobCreateManyMediaInputSchema";

export const ProcessMediaJobCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.ProcessMediaJobCreateManyMediaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ProcessMediaJobCreateManyMediaInputSchema),
        z.lazy(() => ProcessMediaJobCreateManyMediaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default ProcessMediaJobCreateManyMediaInputEnvelopeSchema;
