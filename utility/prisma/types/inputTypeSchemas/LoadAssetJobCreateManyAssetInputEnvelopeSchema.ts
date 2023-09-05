import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobCreateManyAssetInputSchema } from "./LoadAssetJobCreateManyAssetInputSchema";

export const LoadAssetJobCreateManyAssetInputEnvelopeSchema: z.ZodType<Prisma.LoadAssetJobCreateManyAssetInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => LoadAssetJobCreateManyAssetInputSchema),
        z.lazy(() => LoadAssetJobCreateManyAssetInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default LoadAssetJobCreateManyAssetInputEnvelopeSchema;
